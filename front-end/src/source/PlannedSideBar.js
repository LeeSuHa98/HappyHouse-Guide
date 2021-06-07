import React, {useState, useEffect} from 'react';
import Moment from 'react-moment'
import HappyChart from './Chart';
import { FormText, Spinner } from 'reactstrap';

import './css/Sidebar.css';

import undo from '../Image/undo.png'


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const PlannedSideBar = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  const [typeIndex, SetTypeIndex] = useState(0)

  useEffect(() => {
    setIsLoading(false)
  }, [props.plannedDetail.region])

  const typeButton = (list) =>{
    return list.map((data, index)=>(
            <button id = "typeButton" onClick = {()=>SetTypeIndex(index)}>{index}</button>
    ))
}
  return (
    <div className="side-bar-wrap">
      {
          isLoading ?
          <div className="side-bar" id="sideBar2" style ={{display : "none"}}>
            <div>
              <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
            </div>
          </div>
          :
            <div className="side-bar" id="sideBar2" style ={{display : "none"}}>
                <div className = "beforeContent">
                <img alt="sidebar hide" src = {undo} id="sidebarHide" onClick ={() => {props.toggle()}}
                className="toggle-menu"
                />
                
                </div>
                                                                    
              <div className="content">

                <div id = "houseInfoSection1">
                  <table className ="houseInfoTable1">
                    <tr> 
                      <td class = "houseName" colSpan="2">{props.plannedDetail.region}</td>
                    </tr>
                    <tr>
                      <td className ="houseAddress">{props.plannedDetail.address}</td>
                    </tr>
                  </table>
                </div>

                <div id = "houseInfoSection2">
                      <div class = "test2">주택정보</div>
                      <div class ="typeGroup">
                      {typeButton(props.plannedDetail.type)}
                      </div>
                          <table class="houseInfoTable2">
                            <tr>
                              <td id = "td1">준공일자</td>
                              <td>
                                <Moment format="YYYY / MM / DD">{props.plannedDetail.supply}</Moment>
                              </td>
                            </tr>
                            <tr>
                              <td id="td1">주택형</td>
                              <td>미정</td>
                            </tr>
                            <tr>
                              <td id="td1">면적</td>
                              <td>{props.plannedDetail.type[typeIndex].면적}(㎡)</td>
                            </tr>
                            <tr>
                              <td id="td1">공급호수</td>
                              <td>{props.plannedDetail.type[typeIndex].공급호수}호수</td>
                            </tr>
                          </table>
                          
                          <HappyChart danjiName = {props.plannedDetail.region} convenience = {props.plannedDetail.convenience} safety = {props.plannedDetail.safety} medical = {props.plannedDetail.medical}/>
                        </div>
                    </div>  
                        
                      </div>
                
          }
        </div>
  );
};

export default React.memo(PlannedSideBar);