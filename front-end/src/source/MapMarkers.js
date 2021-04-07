import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './Sidebar.css'
import image from '../Image/apartment.png'

export const MapMarkers = (props) => {
    var windowOuterSize = window.outerWidth;

    const [item, setItem] = useState([]);
    const [houseDetail, setHouseDetail] = useState([]);

    const [xPosition, setX] = useState(windowOuterSize);
    const [isToggleOn, setIsToggleOn] = useState(true);


    const toggleMenu = () => {
      if(isToggleOn.false) {
        setX(400);
      }
      else{
        setX(0);
      }
    }

    const toggleMarker = () => {
      if ( xPosition < windowOuterSize) {
        setX(-400);
      }
      else if(isToggleOn.false) {
        setX(-400);
      }
    };

  const handClick = (item) => {
    setIsToggleOn( prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
    return (
      <div>{toggleMarker()}</div>
    )
  }
    React.useEffect(() => {
      setX(400);
    }, []);

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
            <Marker className='marker-image' key={data._id} position={{lat:data.lat, lng:data.lng}}
            icon={{
              url: image,
              scaledSize: new props.google.maps.Size(40,50),
            }}
            onClick={() => handClick(
              setHouseDetail(data),
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
        <div
          className="side-bar"
          style={{
            transform: `translatex(${xPosition}px)`,
            left: windowOuterSize,
            width: 400,
            minHeight: '100vh'
          }}
        >
          <button onClick={() => toggleMenu()} className="toggle-menu"></button>
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
