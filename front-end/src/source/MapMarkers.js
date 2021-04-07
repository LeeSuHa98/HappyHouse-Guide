import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {useHistory, useLocation} from "react-router";
import './Sidebar.css'

export const MapMarkers = (props) => {
  var windowOuterSize = window.outerWidth;

    const [item, setItem] = useState([]);
    const [xPosition, setX] = useState(windowOuterSize);
    const [isToggleOn, setIsToggleOn] = useState(true);

    const history = useHistory();
    const location = useLocation();

    // 첫 랜더링에 값이 안들어가서 오류가 나서 일단은 props로 연결 시켜주고 location으로 값 들어가게 했지만.. 고쳐야함 
    // 이거 첫번째로 주석 풀고 돌린다음에
    // const address = props.address;
    // const danjiName =props.danjiName;
    // const bassMonthlyRentCharge = props.bassMonthlyRentCharge;
    // const suplyCommuseArea = props.suplyCommuseArea;
    // const suplyPrivateArea = props.suplyPrivateArea;

    //얘 주석 풀어서 두번째로 돌리면 일단은 됨
    const address = location.state.address;
    const danjiName = location.state.danjiName;
    const bassMonthlyRentCharge = location.state.bassMonthlyRentCharge;
    const suplyCommuseArea = location.state.suplyCommuseArea;
    const suplyPrivateArea = location.state.suplyPrivateArea;

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

  const handClick = () => {
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
            <Marker key={data._id} position={{lat:data.lat, lng:data.lng}}
            onClick={() => handClick(history.push({
                    state: {
                        address: data.address,
                        danjiName: data.danjiName,
                        bassMonthlyRentCharge: data.bassMonthlyRentCharge,
                        suplyCommuseArea: data.suplyCommuseArea,
                        suplyPrivateArea: data.suplyPrivateArea
                    }
                }
                ))
              }/>
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
            <div>주소 : {address}</div>
            <div>단지명 : {danjiName}</div>
            <div>월세 : {bassMonthlyRentCharge}</div>
            <div>공공면적 : {suplyCommuseArea}</div>
            <div>개인면적 : {suplyPrivateArea}</div>
          </div>
        </div>
        </React.Fragment>
        </div>

    );
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCvljxDf0P6qv5kvTo5WIYRlWU3VZn3hks"
})(MapMarkers);
