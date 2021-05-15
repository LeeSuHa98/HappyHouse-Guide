import React, {useState, useEffect} from 'react';
import './Sidebar.css'
import cancel from '../Image/cancel.png'
import like1 from '../Image/like.png'
import like2 from '../Image/like-toggle.png'
import star1 from '../Image/star1.PNG'
import star2 from '../Image/star2.PNG'
import room4 from '../Image/room4.PNG'
import Moment from 'react-moment'
import HappyChart from './Chart';
import numeral from 'numeral'
import axios from 'axios';

const SideBar = (props) => {

    const [typeIndex, SetTypeIndex] = useState(0)

    var cnt = 1;

    function changeImage(){
      var tmpCheck = document.getElementById("tmp");
      
      var insertForm={
        userId : localStorage.getItem("userID"),
        danjiCode : props.houseDetail.danjiCode,
        danjiName : props.houseDetail.danjiName
        };

        var deleteForm={
          userId : localStorage.getItem("userID"),
          danjiCode : props.houseDetail.danjiCode
          };
     
       if(cnt%2==1){
        tmpCheck.src = like2;   

        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', insertForm).then((res) => {
        // alert(insertForm.userId)
        // alert(insertForm.danjiCode)
        alert("좋아요 등록 완료")
        // window.location.reload();
        props.toggle()
        }).catch(function (error){
        console.log(error)  
       })
      }
      else{
        tmpCheck.src = like1;

        axios.delete('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs', {data:deleteForm}).then((res) => {
          // alert(deleteForm.userId)
          // alert(deleteForm.danjiCode)
          alert("좋아요 취소 완료")
        // window.location.reload();
        props.toggle()
        }).catch(function (error){
        console.log(error)  
       })
      }
      cnt++;
    }

    const typeButton = (list) =>{
        return list.map((data, index)=>(
                <button id = "typeButton" onClick = {()=>SetTypeIndex(index)}>{data.typeName}</button>
        ))
    }

  return (
    <div className="side-bar-wrap">
        <div className="side-bar" id="sideBar" style ={{display : "none"}}>
             
             <img alt="sidebar hide" src={cancel} id="sidebarHide" onClick ={() => {props.toggle()}}
             className="toggle-menu"
             />
                                
           <div className="content">
            <div className = "imageSection">
              <img src={room4} id="roomImage"></img> 
            </div>
            <div id = "houseInfoSection1">
           <table className ="houseInfoTable1">
             <tr> 
               <td class = "houseName" colSpan="2">{props.houseDetail.danjiName}</td>
               <td class="likeButton"> <img id = "tmp"alt='like' src={like1} className="likeImage" onClick={() => changeImage()}/></td>
             </tr>
             <tr>
             <td className ="houseAddress">{props.houseDetail.address}</td>
             </tr>
             </table>
             </div>

             <div id = "houseInfoSection2">
               <div class = "test2">주택정보</div>
                    <div className = "typeGroup">
                        {typeButton(props.houseDetail.houseDetailInfo)}
                    </div>
                   <table class="houseInfoTable2">
                        <tr>
                            <td id = "td1">공급세대</td>
                            <td colSpan="2">{props.houseDetail.houseHoldNum} 세대</td>
                            </tr>
                            <tr>
                            <td id = "td1">준공일자</td>
                            <td colSpan = "2">
                                <Moment format="YYYY / MM / DD">{props.houseDetail.competeDate}</Moment>
                            </td>
                            </tr>
                            <tr>
                            <td id="td1">주택형</td>
                            <td id="td1">공공 공용면적</td>
                            <td id="td1"> 개인 공용면적</td>
                        </tr>
                        <tr>
                            <td>{props.houseDetail.houseDetailInfo[typeIndex].typeName}</td>
                            <td>{props.houseDetail.houseDetailInfo[typeIndex].suplyCommuseArea}</td>
                            <td>{props.houseDetail.houseDetailInfo[typeIndex].suplyPrivateArea}</td>
                        </tr>
                        <tr>
                            <td id="td1">임대 보증금</td>
                            <td id="td1">전환 보증금</td>
                            <td id="td1">월 임대료</td>
                        </tr>
                        <tr>
                            <td>{numeral(props.houseDetail.houseDetailInfo[typeIndex].bassRentDeposit).format('0,0')}</td>
                            <td>{numeral(props.houseDetail.houseDetailInfo[typeIndex].bassConversionDeposit).format('0,0')}</td>
                            <td>{numeral(props.houseDetail.houseDetailInfo[typeIndex].bassMonthlyRentCharge).format('0,0')}</td>
                        </tr>
                   </table>

                   <HappyChart danjiName = {props.houseDetail.danjiName} convenience = {props.houseDetail.convenience} safety = {props.houseDetail.safety} medical = {props.houseDetail.medical}/>
                 </div>
                  
                   <div id = "houseInfoSection4">
                   <div class = "test2">
                     <div>거주후기</div>
                    <button id = "moreReview" onClick = {()=>{window.location.href ='/reviews'}}>더보기</button>
                  </div>
                   
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
  );
};

export default React.memo(SideBar);