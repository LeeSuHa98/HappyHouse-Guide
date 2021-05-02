import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Moment from 'react-moment'
import Chatbot from "react-chatbot-kit"
import numeral from 'numeral'
import {Bar} from 'react-chartjs-2';

import './Sidebar.css'
import './Menubar.css'

import image from '../Image/apartment_.png'
import cancel from '../Image/cancel.png'
import logo from '../Image/houseLogo.png'
import chatbot from '../Image/faq2.png'
import like from '../Image/like.png'
import star1 from '../Image/star1.PNG'
import star2 from '../Image/star2.PNG'

import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';
import Header from './Header'

import{
Modal,
ModalBody
} from 'reactstrap';
import Login from'./Login'

export const MapMarkers = (props) => {
    const [item, setItem] = useState([]);
    const [houseDetail, setHouseDetail] = useState([]);
    const [type, setType] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [convenience, setConvenience] = useState([]);
    const [medical, setMedical] = useState([]);
    const [safety, setSafety] = useState([]);



    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [token, setToken] = useState(); // -> testID



    let typeName = [];
    let suplyPrivateArea = [];
    let suplyCommuseArea = [];
    let bassRentDeposit = [];
    let bassConversionDeposit = [];
    let bassMonthlyRentCharge = [];

    let houseDto = class{
      constructor(typeName, suplyCommuseArea, suplyPrivateArea, bassRentDeposit, bassConversionDeposit,bassMonthlyRentCharge, danjiCode){
        this.typeName = typeName;
        this.suplyCommuseArea = suplyCommuseArea;
        this.suplyPrivateArea = suplyPrivateArea;
        this.bassRentDeposit = bassRentDeposit;
        this.bassConversionDeposit = bassConversionDeposit;
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
      getBassConversionDeposit() {return this.bassConversionDeposit;}
      getBassMonthlyRentCharge() { return this.bassMonthlyRentCharge; }

      toDetail() {
        return `
         공공 공용 면적 : ${this.suplyCommuseArea}
         개인 전용 면적 : ${this.suplyPrivateArea}
         기본 전환보증금 : ${this.bassRentDeposit}
         기본 임대보증금 : ${this.bassMonthlyRentCharge}
         월 임대료 : ${this.bassConversionDeposit}
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
              .push(new houseDto(curHouse.typeName, curHouse.suplyCommuseArea, curHouse.suplyPrivateArea, curHouse.bassRentDeposit, curHouse.bassConversionDeposit,curHouse.bassMonthlyRentCharge, curHouse.danjiCode));
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
           if(type[houseDetail.address] && type[houseDetail.address].length > 0){
        for(let i = 0; i < type[houseDetail.address].length; i++){
          typeName[i] = type[houseDetail.address][i].toString();
          suplyCommuseArea[i] = type[houseDetail.address][i].getSuplyCommuseArea();
          suplyPrivateArea[i] = type[houseDetail.address][i].getSuplyPrivateArea();
          bassRentDeposit[i] = type[houseDetail.address][i].getBassRentDeposit();
          bassConversionDeposit[i] = type[houseDetail.address][i].getBassConversionDeposit();
          bassMonthlyRentCharge[i] = type[houseDetail.address][i].getBassMonthlyRentCharge();
        }
      }

      return(
        <div class = "typeGroup">
          {typeName.map((data, i) => {
            return (
              <button id = "typeButton" key={i} onClick={() => setSelectedIndex(i) }>{data}</button>
            )
          })}
        </div>
      )
    }

    const countFunctionDetail = () => {
        if (selectedIndex === null) return;

      return(
          console.log("check")
      )
    }

    // Chart
    const data = {
      labels: ['Convenience', 'Safety', 'Medical'],
      datasets: [
        {
          label: houseDetail.danjiName,
          backgroundColor: ['rgba(255,99,132,0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
          borderWidth: 1,
          hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgba(54, 162, 235, 0.4)','rgba(255, 206, 86, 0.4)'],
          hoverBorderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
          data: [convenience,safety,medical]
        }
      ]
    };
    function drawGraph() {
      return (
        <div className = "chart"> 
            <Bar
              data={data}
              options={{
                maintainAspectRatio: false
              }}
            />
        </div>
      );
    }




    return(
<div>
    <React.Fragment>
        <Map google={props.google} zoom={15} style={mapStyles} initialCenter={ {lat: 37.5, lng: 127} }>
            {displayMarkers()}
        </Map>
      
        <Header/>
        
        <div id="chatbot" className="chatbot-show">
          <Chatbot 
          config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div>
        <img alt="chatbot" src={chatbot} className="chatbot-button" onClick={() => chatbotFAQ()}/>


        <div className="side-bar-wrap" >
            <div className="side-bar" id="sideBar">
             
                <img alt="sidebar hide" src={cancel} id="sidebarHide" onClick={()=> sidebarHide()}
                className="toggle-menu"
                />
                 
                {loadAsyncHouseGradeData()}                  
              <div className="content">
              <div id = "houseInfoSection1">
              <table className ="houseInfoTable1">
                <tr> 
                  <td class = "houseName" colspan="2">{houseDetail.danjiName}</td>
                  <td class="likeButton"> <img alt='like' src={like} className="likeImage"/></td>
                </tr>
                <tr>
                <td className ="houseAddress">{houseDetail.address}</td>
                </tr>
                </table>
                </div>

                <div id = "houseInfoSection2">
                  <div class = "test2">주택정보</div>
                      {countFunction()}
                      {countFunctionDetail()}

                      <table class="houseInfoTable2">
                      <tr>
                          <td id = "td1">공급세대</td>
                          <td colspan="2">{houseDetail.houseHoldNum} 세대</td>
                        </tr>
                        <tr>
                          <td id = "td1">준공일자</td>
                          <td colspan = "2">
                            <Moment format="YYYY / MM / DD">{houseDetail.competeDate}</Moment>
                          </td>
                        </tr>

                        <tr>
                          <td id="td1">주택형</td>
                          <td id="td1">공공 공용면적</td>
                          <td id="td1"> 개인 공용면적</td>
                        </tr>
                        <tr>
                          <td>{typeName[selectedIndex]}</td>
                          <td>{suplyCommuseArea[selectedIndex]}(㎡)</td>
                          <td>{suplyPrivateArea[selectedIndex]}(㎡)</td>
                        </tr>
                        <tr>
                          <td id="td1">임대 보증금</td>
                          <td id="td1">전환 보증금</td>
                          <td id="td1">월 임대료</td>
                        </tr>
                        <tr>
                          <td>{numeral(bassRentDeposit[selectedIndex]).format('0,0')}</td>
                          <td>{numeral(bassConversionDeposit[selectedIndex]).format('0,0')}</td>
                          <td>{numeral(bassMonthlyRentCharge[selectedIndex]).format('0,0')}</td>
                        </tr>

                       
                      </table>
                    </div>
                    
                    <div id = "houseInfoSection3">
                      <div class = "test2">그래프</div>
                      {drawGraph()}
                    </div>

                      <div id = "houseInfoSection4">
                      <div class = "test2">거주후기<button id = "moreReview">더보기</button></div>
                      

                          <div class = "reviewGroup">

                          <div class = "review"> 
                          <img src={star1} id="starImage" />
                          <p>교통여건이 우수하며 대중교통 노선도 다양하다.<br></br>
                            또한 월세도 다른 임대주택에 비해 저렴해서 좋다.</p>
                          </div>
                          <div class = "review"> 
                          <img src={star2} id="starImage" />
                          <p>주변에 버스나 지하철역이 가까이 있어서 편했고요, <br></br>
                          생각보다도 집이  더 깔끔하고 좋습니다 !</p>
                          </div>
                          <div class = "review"> 
                          <img src={star2} id="starImage" />
                          <p>거주후기3</p>
                          </div>

                      </div>
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