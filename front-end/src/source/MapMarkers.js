import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import numeral from 'numeral'

import SearchBar from './SearchBar'
import SideBar from './SideBar';
import './css/SearchBar.css';
import './css/Menubar.css';
import './css/Sidebar.css';

import image from '../Image/placeholder.png'
import plan from '../Image/placeholder2.png'


export const MapMarkers = (props) => { 
    const [item, setItem] = useState([]);
    const [planned, setPlanned] = useState([]);
    const [houseDetail, setHouseDetail] = useState({
      _id:"",
      danjiCode: "",
      danjiName: "",
      address: "",
      competeDate: "",
      houseHoldNum: "",
      houseType: "",
      houseDetailInfo : [{
        typeName:"",
        bassRentDeposit: "",
        bassMonthlyRentCharge: "",
        bassConversionDeposit: "",
        suplyPrivateArea: "",
        suplyCommuseArea: ""}],
      insttName: "",
      convenience: "",
      safety: "",
      medical: ""
    });
    const [center, setCenter] = useState()
    const [zoom, setZoom] = useState()

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
      sidebarHide()
      setCenter({lat: 37.5, lng: 127})
      setZoom(15)
      loadAsyncData();
      loadAsyncPlannedData();
    }, [])

    const loadAsyncData = () => {
        let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseinfos/address`;

        axios.get(url).then(({data}) => {
            data = data.houseInfoList
            setItem(data);
        })
    }

    const loadAsyncPlannedData = () => {
      let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/plannedPlace`;

      axios.get(url).then(({data}) => {
          data = data.plannedPlaceList;
          setPlanned(data);
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
          // label={{
          //   text: `${numeral(data.houseHoldNum).format('0,0')}세대`,
          //   fontSize: "13px",
          //   fontFamily: "Do Hyeon",
          //   color: "white",
          //   className: 'label'
          // }}
          onClick = {()=>{
          sidebarShow();
          setHouseDetail(data);}}
          />
          ))
  }

  const displayPlannedMarkers = () => {
    return planned.map((data) => (
        <Marker className='marker-image' 
        key={data._id} 
        position={{lat:data.lat, lng:data.lng}}
        icon={{
          url: plan,
          scaledSize: new props.google.maps.Size(30,30),
          //labelOrigin: new props.google.maps.Size(50, 115),
        }}
        // label={{
        //   text: `${numeral(data.houseHoldNum).format('0,0')}`,
        //   fontSize: "10px",
        //   fontFamily: "Nanum Barun Gothic",
        //   color: "white",
        //   className: 'label'
        // }}
        onClick={() =>{
          sidebarShow(setHouseDetail(data));
        }}
        />
        ))
  }


    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    const sidebarHide = () => {
      var con = document.getElementById("sideBar");
      if(con.style.display==='block'){
      con.style.display='none';
      }
    }

    const sidebarShow = () => {
      var con = document.getElementById("sideBar");
      if(con.style.display!=='block'){
        con.style.display='block';
      }else{
        con.style.display='block';
      }
    }


    return(
    <div>
      <React.Fragment>
        <Map google={props.google} zoom={zoom} style={mapStyles} center={center}  mapTypeControl={false}>
            {displayMarkers()}
            {displayPlannedMarkers()}
          <SearchBar setCenter={setCenter} setZoom={setZoom} />
        </Map>
        <SideBar houseDetail = {houseDetail} toggle = {()=>sidebarHide()}></SideBar>
      </React.Fragment>
    </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCvljxDf0P6qv5kvTo5WIYRlWU3VZn3hks"
})(MapMarkers);