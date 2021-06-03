import React, {useCallback,useState, useEffect} from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import numeral from 'numeral'

import SearchBar from './SearchBar'
import SearchDanjiBar from './SearchDanjiBar'
import SearchDanjiAlertBar from './SearchDanjiAlterbar'
import SideBar from './SideBar';
import PlannedSideBar from './PlannedSideBar'

import './css/SearchBar.css';
import './css/Menubar.css';
import './css/Sidebar.css';

import image from '../Image/apt.png'
import plan from '../Image/planned_apt.png'


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

    const [plannedDetail, setPlannedDetail] = useState({
      _id:"",
      region: "",
      type: [{
        면적: "",
        공급호수: "",
      }],
      supply: "",
      move: "",
      address: "",
      convenience: "",
      safety: "",
      medical: ""
    });

    const [center, setCenter] = useState()
    const [zoom, setZoom] = useState()

    useEffect(() => {
      sidebarHide()
      sidebarHide2()
      setCenter({lat: 37.5, lng: 127})
      setZoom(15)
      loadAsyncData();
      loadAsyncPlannedData();
    }, [])

    const loadAsyncData = () => {
        let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseinfos/address`;

        axios.get(url).then(({data}) => {
          console.log(data)
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

    
    const displayMarkers = useCallback(() => {
      return item.map((data) => (
          <Marker className='marker-image' 
          key={data._id} 
          position={{lat:data.lat, lng:data.lng}}
          icon={{
            url: image,
            scaledSize: new props.google.maps.Size(50,40),
          }}
          label={{
            text: `${(data.houseDetailInfo[0].bassRentDeposit).substring(0,4)} 만원 `,
            fontSize: "12px",
            color: "white",
            className: 'label'
          }}
          onClick = {()=>{
          sidebarShow();
          setHouseDetail(data);}}
          />
          ))
  })

  const displayPlannedMarkers = useCallback(() => {
    return planned.map((data) => (
        <Marker className='marker-image' 
        key={data._id} 
        position={{lat:data.lat, lng:data.lng}}
        icon={{
          url: plan,
          scaledSize: new props.google.maps.Size(50,50),
        }}
        label={{
          text: `공급예정`,
          fontSize: "12px",
          color: "white",
          className: 'planned-label'
        }}
        onClick={() =>{
          sidebarShow2();
          setPlannedDetail(data);}}
        />
        ))
  })


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
      var con2 = document.getElementById("sideBar2");

      if(con.style.display!=='block'){
        con.style.display='block';
      }else if( con2.style.display === 'block'){
        con2.style.display = 'none';
        con.style.display = 'block';
      }else{
        con.style.display='block';
      }
    }
    const sidebarHide2 = () => {
      var con = document.getElementById("sideBar2");
      if(con.style.display==='block'){
      con.style.display='none';
      }
    }

    const sidebarShow2 = () => {
      var con = document.getElementById("sideBar2");
      var con2 = document.getElementById("sideBar2");

      if(con.style.display!=='block'){
        con.style.display='block';
      }else if( con.style.display === 'block'){
        con.style.display = 'none';
        con2.style.display = 'block';
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
          {/* <SearchDanjiBar setCenter={setCenter} setZoom={setZoom} /> */}
        </Map>
        <SideBar houseDetail = {houseDetail} toggle = {()=> sidebarHide()}></SideBar>
        <PlannedSideBar plannedDetail = {plannedDetail} toggle = {() => sidebarHide2()}></PlannedSideBar>
      </React.Fragment>
    </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCvljxDf0P6qv5kvTo5WIYRlWU3VZn3hks"
})(MapMarkers);