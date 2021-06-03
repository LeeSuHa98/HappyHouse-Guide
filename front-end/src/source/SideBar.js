import React, {useState, useEffect} from 'react';
import Moment from 'react-moment'
import HappyChart from './Chart';
import numeral from 'numeral'
import axios from 'axios';
import Slider from "react-slick";
import { FormText, Spinner } from 'reactstrap';

import './css/Sidebar.css';

import undo from '../Image/undo.png'
import like1 from '../Image/like.png'
import like2 from '../Image/like-toggle.png'
import star from '../Image/star.png'


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const SideBar = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [typeIndex, SetTypeIndex] = useState(0)
    const [isLike, setIsLike] = useState(false);
    
    useEffect(() => {
      loadDibsData(props.houseDetail.danjiCode)
      loadReview(props.houseDetail.danjiCode)
      loadReviewPicture(props.houseDetail.danjiCode)
    },[props.houseDetail.danjiCode])

    function loadDibsData (code) {
      setIsLoading(true)
      var userId = localStorage.getItem("userID")
      
      setIsLike(false)
      axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs/${userId}/${code}`).then(({data}) => {
        data = data.dibs
        if (data[0] != null){
          setIsLike(true)
        }
        
        setIsLoading(false)
      }) 
    }


    function changeImage(){
      var temp = document.getElementById("tmp").src.includes("-toggle")
      
      var insertForm={
        userId : localStorage.getItem("userID"),
        danjiCode : props.houseDetail.danjiCode,
        danjiName : props.houseDetail.danjiName
        };

        var deleteForm={
          userId : localStorage.getItem("userID"),
          danjiCode : props.houseDetail.danjiCode,
          };

       if(temp == false){
        setIsLike(true)
        
        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', insertForm).then((res) => {
        // window.location.reload();
        }).catch(function (error){
        console.log(error)  
       })
       
      }

      else{
        setIsLike(false)
        
        axios.delete('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', {data:deleteForm}).then((res) => {
        // window.location.reload();
        }).catch(function (error){
        console.log(error)  
       })
       
      }
      
    }


    const typeButton = (list) =>{
        return list.map((data, index)=>(
                <button id = "typeButton" onClick = {()=>SetTypeIndex(index)}>{data.typeName}</button>
        ))
    }

  // review
  const [lastThreeReview, setReview] = useState([]);
  const [pictureSrc, setPicture] = useState([]);

  function loadReview (code) {
    var url = `/happyhouse/reviews/houseid/${code}/lastThree`
      axios.get(url).then(({data}) => { 
        setReview(data.reviews.map(reviews))  
      })
  }
  
  const reviews = (review) => (
    <li id="li-reivew">
      <div class = "rev-title">
        <div id="rev-title1">{review.title}</div>
        <div id= "rev-title2"><img src={star} className="starImg" />{review.star}</div>
      </div>
    </li>    
  );

  function loadReviewPicture(code) {
    var url = `/happyhouse/reviews/houseid/${code}/onlyPicture`
    axios.get(url).then(({data}) => { 
      setPicture(data.reviews.map(pictureSource))  
    })
  }

  const pictureSource = (review) => (
    <div>
    <img src={review.picture} id="reviewImg"></img>
    </div>
  );

 

 

  function makeCarousel(){
      const settings = {
        dots: false,
        infinite: true,
        speed: 150,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
          <Slider {...settings}>
            {pictureSrc}
          </Slider>
      );

  }

  return (
    <div className="side-bar-wrap">
      {
          isLoading ?
          <div className="side-bar" id="sideBar" style ={{display : "none"}}>
            <div>
              <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
            </div>
          </div>
          :
            <div className="side-bar" id="sideBar" style ={{display : "none"}}>
                
                <div className = "beforeContent">
                <img alt="sidebar hide" src = {undo} id="sidebarHide" onClick ={() => {props.toggle()}}
                className="toggle-menu"
                />
                
                {
                        isLike
                        ?
                        <img id = "tmp" alt='like' src={like2} className="likeImage" onClick={() => changeImage()}/>
                        :
                        <img id = "tmp" alt='like' src={like1} className="likeImage" onClick={() => changeImage()}/>
                  }

                </div>
                                                                    
              <div className="content">
                <div className = "imageSection">
                 {
                   pictureSrc != null
                   ?
                   makeCarousel()
                   :
                   <div></div>
                 }
                </div>

                <div id = "houseInfoSection1">
                  <table className ="houseInfoTable1">
                    <tr> 
                      <td class = "houseName" colSpan="2">{props.houseDetail.danjiName}</td>
                    </tr>
                    <tr>
                      <td className ="houseAddress">{props.houseDetail.address}</td>
                    </tr>
                  </table>
                </div>

                <div id = "houseInfoSection2">
                      <div class = "test2">주택정보</div>
                          <div class ="typeGroup">
                          {typeButton(props.houseDetail.houseDetailInfo)}
                          </div>
                          <table class="houseInfoTable2">
                          <tr>
                              <td id="td1">주택형</td>
                              <td>{props.houseDetail.houseDetailInfo[typeIndex].typeName}</td>
                            </tr>
                          <tr>
                              <td id = "td1">공급세대</td>
                              <td>{props.houseDetail.houseHoldNum} 세대</td>
                            </tr>
                            <tr>
                              <td id = "td1">준공일자</td>
                              <td>
                                <Moment format="YYYY / MM / DD">{props.houseDetail.competeDate}</Moment>
                              </td>
                            </tr>
                            <tr>
                              <td id="td1">임대 보증금</td>
                              <td> {numeral(props.houseDetail.houseDetailInfo[typeIndex].bassRentDeposit).format('0,0')} 원</td>
                            </tr>
                            <tr>
                              <td id="td1">월 임대료</td>
                              <td>{numeral(props.houseDetail.houseDetailInfo[typeIndex].bassMonthlyRentCharge).format('0,0')} 원</td>
                            </tr>
                            <tr>
                              <td id="td1">전환 보증금</td>
                              <td>{numeral(props.houseDetail.houseDetailInfo[typeIndex].bassConversionDeposit).format('0,0')} 원</td>
                            </tr>
                            <tr>
                              <td id="td1">공공 공용면적</td>
                              <td>{props.houseDetail.houseDetailInfo[typeIndex].suplyCommuseArea} (㎡)</td>
                            </tr>
                            <tr>
                              <td id="td1"> 개인 공용면적</td>
                              <td>{props.houseDetail.houseDetailInfo[typeIndex].suplyPrivateArea} (㎡)</td>
                            </tr>
                          </table>
                          
                          <HappyChart danjiName = {props.houseDetail.danjiName} convenience = {props.houseDetail.convenience} safety = {props.houseDetail.safety} medical = {props.houseDetail.medical}/>
                        </div>
                    </div>
                      
                      <div id = "houseInfoSection4">
                        <div class = "test2">거주후기
                          <button id = "moreReview" onClick = {()=>{localStorage.setItem("danjiCode",props.houseDetail.danjiCode); window.location.href ='/reviews/create'}}>거주후기 작성</button>
                          <button id = "moreReview" onClick = {()=>{localStorage.setItem("danjiCode",props.houseDetail.danjiCode); window.location.href ='/reviews'}}>더보기</button>
                      </div>
                      
                      
                      <div>
                        <ul class = "rt">
                        {lastThreeReview}
                        </ul>
                      </div>
                      
                           
                        
                        
                                          
                        </div>
                      </div>
                
          }
        </div>
  );
};

export default React.memo(SideBar);