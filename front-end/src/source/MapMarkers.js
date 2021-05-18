import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Moment from 'react-moment'
import Chatbot from "react-chatbot-kit"
import numeral from 'numeral'
import {Bar} from 'react-chartjs-2'
import './css/Sidebar.css'
import './css/Menubar.css'
import './Menubar.js'

import image from '../Image/placeholder.png'
import cancel from '../Image/loupe.png'
import undo from '../Image/undo.png'
import like1 from '../Image/like.png'
import like2 from '../Image/like-toggle.png'
import star1 from '../Image/star1.PNG'
import star2 from '../Image/star2.PNG'
import room4 from '../Image/room4.PNG'
// import chatbot2 from '../Image/help.png'
import chatbot2 from '../Image/helpEx.png'

import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import SearchBar from './SearchBar'
import config from '../chatbot/config';

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
      var con2 = document.getElementById("chatbotM");
      if(con.style.display==='none'){
        con.style.display='block';
        con2.style.display='none';
      }else{
        con.style.display='none'; 
        con2.style.display='block';
      }
    }

    useEffect(() => {
      setCenter({lat: 37.5, lng: 127})
      setZoom(15)
      loadAsyncData();
    }, [])


    
    const [dibsList, setDibsList] = useState();
    const dibs = (dib) => (
      <li>{dib.danjiCode}</li>
    );

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

        axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs/userid/${localStorage.getItem("userID")}`).then(({data}) => {
          data = data.dibs
          setDibsList(data.map(dibs))
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
            scaledSize: new props.google.maps.Size(30,30),
            //labelOrigin: new props.google.maps.Size(50, 115),
          }}
          label={{
            text: `${numeral(data.houseHoldNum).format('0,0')}`,
            fontSize: "10px",
            fontFamily: "Nanum Barun Gothic",
            color: "white",
            className: 'label'
          }}
          onClick={() => sidebarShow(setHouseDetail(data))}
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

    const [center, setCenter] = useState()
    const [zoom, setZoom] = useState()

    /* Dibs */
    var cnt = 1;

    function changeImage(props){
      var tmpCheck = document.getElementById("tmp");
      
      var insertForm={
        userId : localStorage.getItem("userID"),
        danjiCode : houseDetail.danjiCode,
        danjiName : houseDetail.danjiName
        };

        var deleteForm={
          userId : localStorage.getItem("userID"),
          danjiCode : houseDetail.danjiCode,
          };

       if(cnt%2==1){
        tmpCheck.src = like2;   
        
        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', insertForm).then((res) => {
        // window.location.reload();
        props.toggle()
        }).catch(function (error){
        console.log(error)  
       })
      }

      else{
        tmpCheck.src = like1;
        
        axios.delete('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', {data:deleteForm}).then((res) => {
        // window.location.reload();
        props.toggle()
        }).catch(function (error){
        console.log(error)  
       })
      }
      cnt++;
    }

    



    return(
    <div>
    <React.Fragment>
        <Map google={props.google} zoom={zoom} style={mapStyles} center={center} mapTypeControl={false}>
            {displayMarkers()}
          <SearchBar setCenter={setCenter} setZoom={setZoom} />
        </Map>

        <div id="chatbot" className="chatbot-show">
          <Chatbot 
          config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div> 
        
        <div id = "chatbotM">
            <div id = "messageText1"><img src={cancel} id="cancelImg"/>청년 행복주택 알리미 </div>
            <div id = "messageText2">무엇을 도와드릴까요?</div>
        </div>
        <img alt="chatbot" src={chatbot2} className="chatbot-button" onClick={() => chatbotFAQ()}/>
    
          
       


        <div className="side-bar-wrap" >
            <div className="side-bar" id="sideBar">
             
              <div className = "beforeContent">
                 <img alt="sidebar hide" src={undo} id="sidebarHide" onClick={()=> sidebarHide()} className="toggle-menu"/>
                  <img id = "tmp"alt='like' src={like1} className="likeImage" onClick={() => changeImage()}/>
              </div>
                 
                {loadAsyncHouseGradeData()}
                     

              <div className="content">
               <div className = "imageSection">
                 <img src={room4} id="roomImage"></img> 
               </div>

               <div id = "houseInfoSection1">
              <table className ="houseInfoTable1">
                <tr> 
                  <td class = "houseName">{houseDetail.danjiName}</td>
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
                          <td>{houseDetail.houseHoldNum} 세대</td>
                        </tr>
                        <tr>
                          <td id = "td1">준공일자</td>
                          <td>
                            <Moment format="YYYY / MM / DD">{houseDetail.competeDate}</Moment>
                          </td>
                        </tr>

                        <tr>
                          <td id="td1">주택형</td>
                          <td>{typeName[selectedIndex]}</td>
                        </tr>
                        <tr>
                          <td id="td1">공공 공용면적</td>
                          <td>{suplyCommuseArea[selectedIndex]}(㎡)</td>
                        </tr>
                        <tr>
                          <td id="td1"> 개인 공용면적</td>
                          <td>{suplyPrivateArea[selectedIndex]}(㎡)</td>
                        </tr>
                        <tr>
                          <td id="td1">임대 보증금</td>
                          <td>{numeral(bassRentDeposit[selectedIndex]).format('0,0')}</td>
                        </tr>
                        <tr>
                          <td id="td1">전환 보증금</td>
                          <td>{numeral(bassConversionDeposit[selectedIndex]).format('0,0')}</td>
                        </tr>
                        <tr>
                          <td id="td1">월 임대료</td>
                          <td>{numeral(bassMonthlyRentCharge[selectedIndex]).format('0,0')}</td>
                        </tr>
                      </table>
                      
                      {drawGraph()}
                    </div>
                     
                      <div id = "houseInfoSection4">
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