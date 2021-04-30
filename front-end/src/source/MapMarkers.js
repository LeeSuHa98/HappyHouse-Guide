import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Moment from 'react-moment'
import Chatbot from "react-chatbot-kit"

import './Sidebar.css'
import './Menubar.css'

import image from '../Image/apartment_.png'
import cancel from '../Image/cancel.png'
import logo from '../Image/houseLogo.png'
import chatbot from '../Image/faq2.png'

import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';

export const MapMarkers = (props) => {
    const [item, setItem] = useState([]);
    const [houseDetail, setHouseDetail] = useState([]);
    const [type, setType] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [convenience, setConvenience] = useState([]);
    const [medical, setMedical] = useState([]);
    const [safety, setSafety] = useState([]);

    let suplyPrivateArea = [];
    let suplyCommuseArea = [];
    let bassRentDeposit = [];
    let bassMonthlyRentCharge = [];

    let houseDto = class{
      constructor(typeName, suplyCommuseArea, suplyPrivateArea, bassRentDeposit, bassMonthlyRentCharge, danjiCode){
        this.typeName = typeName;
        this.suplyCommuseArea = suplyCommuseArea;
        this.suplyPrivateArea = suplyPrivateArea;
        this.bassRentDeposit = bassRentDeposit;
        this.bassMonthlyRentCharge = bassMonthlyRentCharge;
        this.danjiCode = danjiCode;
      }

      toString() {
        return `${this.typeName}`
      }
      
      getTypeName() { return this.typeName; }
      getSuplyCommuseArea() { return this.suplyCommuseArea; }
      getSuplyPrivateArea() { return this.suplyPrivateArea; }
      getBassRentDeposit() { return this.bassRentDeposit; }
      getBassMonthlyRentCharge() { return this.bassMonthlyRentCharge; }

      toDetail() {
        return `
         공공 공용 면적 : ${this.suplyCommuseArea}
         개인 전용 면적 : ${this.suplyPrivateArea}
         기본 전환보증금 : ${this.bassRentDeposit}
         기본 임대보증금 : ${this.bassMonthlyRentCharge}
         단지코드 : ${this.danjiCode}
        `
      }
    }
    const sidebarHide = () => {
      var con = document.getElementById("sideBar");
      if(con.style.display==='block'){
      con.style.display='none';
      }
    }

    const sidebarShow = () => {
      var con = document.getElementById("sideBar");
      if(con.style.display==='none'){
        con.style.display='block';
      }else{
        con.style.display='block';
      }
    }

    const chatbotFAQ = () => {
      var con = document.getElementById("chatbot");
      if(con.style.display==='none'){
        con.style.display='block';
      }else{
        con.style.display='none';
      }
    }

    useEffect(() => {
        loadAsyncData();
    }, [])

    const loadAsyncData = () => {
        let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseInfos`;

        axios.get(url).then(({data}) => {
            data = data.houseInfoList
            setItem(data);
            setType(data.reduce((infoData, curHouse) => {
              (infoData[curHouse.address] = infoData[curHouse.address] || [])
              .push(new houseDto(curHouse.typeName, curHouse.suplyCommuseArea, curHouse.suplyPrivateArea, curHouse.bassRentDeposit, curHouse.bassMonthlyRentCharge, curHouse.danjiCode));
              return infoData;
            }, {}));
        })
    }

    const loadAsyncHouseGradeData = () => {
      let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseGrade/${houseDetail.danjiCode}`;

      axios.get(url).then(({data}) => {
        data = data.grade;
        setConvenience(data.convenience);
        setSafety(data.safety);
        setMedical(data.medical);
      })
    }
    const displayMarkers = () => {
        return item.map((data) => (
            <Marker className='marker-image' 
            key={data._id} 
            position={{lat:data.lat, lng:data.lng}}
            icon={{
              url: image,
              scaledSize: new props.google.maps.Size(50,50),
            }}
            onClick={() => sidebarShow(
              setHouseDetail(data)
              )}
            />
            ))
    }

    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    const countFunction = () => {
      let result = [];

      if(type[houseDetail.address] && type[houseDetail.address].length > 0){
        for(let i = 0; i < type[houseDetail.address].length; i++){
          result[i] = type[houseDetail.address][i].toString();
          suplyCommuseArea[i] = type[houseDetail.address][i].getSuplyCommuseArea();
          suplyPrivateArea[i] = type[houseDetail.address][i].getSuplyPrivateArea();
          bassRentDeposit[i] = type[houseDetail.address][i].getBassRentDeposit();
          bassMonthlyRentCharge[i] = type[houseDetail.address][i].getBassMonthlyRentCharge();
        }
      }

      return(
        <div>
          {result.map((data, i) => {
            return (
              <button key={i} onClick={() => setSelectedIndex(i) }>{data}</button>
            )
          })}
        </div>
      )
    }

    const countFunctionDetail = () => {
        if (selectedIndex === null) return;

      return(
          <div>
              <div>공공 공용 면적 : {suplyCommuseArea[selectedIndex]}</div>
              <div>개인 전용 면적 : {suplyPrivateArea[selectedIndex]}</div>
              <div>기본 전환 보증금 : {bassRentDeposit[selectedIndex]}</div>
              <div>기본 임대 보증금 : {bassMonthlyRentCharge[selectedIndex]}</div>
          </div>
      )
    }


    return(
<div>
    <React.Fragment>
        <Map google={props.google} zoom={15} style={mapStyles} initialCenter={ {lat: 37.5, lng: 127} }>
            {displayMarkers()}
        </Map>
        <div menu-bar-wrap>
            <div className="menu-bar">
                <div className="logo">
                    <img alt='logo' src={logo} className="logoImage" />
                </div>

                <div className="menuGroup">
                    <div className="reviewButton">REVIEW</div>
                    <div className="communityButton">COMMUNITY</div>
                    <div className="loginButton">LOGIN</div>
                    <div className="text">/</div>
                    <div className="joinButton">JOIN</div>
                </div>


            </div>
        </div>
        
        <div id="chatbot" className="chatbot-show">
          <Chatbot 
          config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div>
        <img alt="chatbot" src={chatbot} className="chatbot-button" onClick={() => chatbotFAQ()}/>


        <div className="side-bar-wrap" >
            <div className="side-bar" id="sideBar">
              {loadAsyncHouseGradeData()}
                <img alt="sidebar hide" src={cancel} id="sidebarHide" onClick={()=> sidebarHide()}
                className="toggle-menu"
                />
                <div className="content">
                    <div>주소 : {houseDetail.address}</div>
                    <div>단지명 : {houseDetail.danjiName}</div>
                    <div>세대 수 : {houseDetail.houseHoldNum}</div>
                    <div>주택 유형 : {houseDetail.houseType}</div>
                    <div>형명 : {countFunction()}</div>
                    {countFunctionDetail()}
                    <br />
                    <div>준공일자 :
                        <Moment format="YYYY.MM.DD">
                            {houseDetail.competeDate}
                        </Moment>
                    </div>
                    <div>
                        <li>편의 : {convenience}</li>
                    </div>
                </div>

            </div>

        </div>

    </React.Fragment></div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCvljxDf0P6qv5kvTo5WIYRlWU3VZn3hks"
})(MapMarkers);