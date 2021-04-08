import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './Sidebar.css'
import './Menubar.css'
import image from '../Image/apartment_.png'
import cancel from '../Image/cancel.png'
import logo from '../Image/testLogo.png'

export const MapMarkers = (props) => {
    const [item, setItem] = useState([]);
    const [houseDetail, setHouseDetail] = useState([]);

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
    React.useEffect(() => {}, []);

    useEffect(() => {
        loadAsyncData();
    }, [])

    const loadAsyncData = () => {
        let url = `https://n72s3qi251.execute-api.us-east-1.amazonaws.com/happyhouse/houseInfos`;

        axios.get(url).then(({data}) => {
            data = data.houseInfoList
            setItem(data);
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

    return(
        <div>
        <React.Fragment>

        <Map
          google = {props.google}
          zoom = {15}
          style = {mapStyles}
          initialCenter = {
              {lat: 37.5, lng: 127}
          }
        >
        {displayMarkers()}
        </Map>

        <div menu-bar-content>

        <div
          className = "menu-bar">
            <div className = "logo">
            <img 
              alt='logo'
              src={logo}
              className="logoImage" 
            />
            </div>
            <div className = "login-join">LOGIN / JOIN</div>
            <div className = "communityButton">COMMUNITY</div>
            <div className = "reviewButton">REVIEW</div>
        </div>
        <div class="divisionLine">
      </div>
      </div>
      
      
        <div
          className="side-bar"
          id="sideBar"
        >
          <img 
          alt="sidebar hide" 
          src={cancel}
          id="sidebarHide"
          onClick={() => sidebarHide()} 
          className="toggle-menu" 
          />
          <div className="content">
            <div>주소 : {houseDetail.address}</div>
            <div>단지명 : {houseDetail.danjiName}</div>
            <div>세대 수 : {houseDetail.houseHoldNum}</div>
            <div>주택 유형 : {houseDetail.houseType}</div>
            <div>기본 임대보증금 : {houseDetail.bassConversionDeposit}</div>
            <div>기본 전환보증금 : {houseDetail.bassRentDeposit}</div>
            <div>월 임대료 : {houseDetail.bassMonthlyRentCharge}</div>
            <div>공공 공용 면적 : {houseDetail.suplyCommuseArea}</div>
            <div>개인 전용 면적 : {houseDetail.suplyPrivateArea}</div>
          </div>
        </div>
        </React.Fragment>
        </div>

    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCvljxDf0P6qv5kvTo5WIYRlWU3VZn3hks"
})(MapMarkers);