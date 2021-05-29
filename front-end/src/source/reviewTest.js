import React, {useState, useEffect} from 'react';
import {
    Progress
} from 'reactstrap';
import axios from 'axios'
import Moment from 'react-moment'
import numeral from 'numeral'
import './css/Review.css'
import $ from 'jquery';
import {Modal, ModalHeader} from 'reactstrap';
import CreateReview from './CreateReview'



const Review =(props)=>{
    
    const [modalInput, setModalInput] = useState();
    const [modalCreateReview, setModalCreateReview] = useState(false);
    const toggleCreateReview = () => setModalCreateReview(!modalCreateReview);
  //  const toggleReadReview = () => setModalReadReview(!modalReadReview);
    const [review_list, setReview] = useState();

    const handleOptionOnChange = (e) => { 
        e.preventDefault();
        //선택안함 이면 옵션 0으로, 다른 옵션도 선택안함으로
        if(e.target.value === "최신순")
        {            
           // setOption(0);
            localStorage.setItem("option", 0)
           // readReview();
        }else{
          //  setOption(1);
            localStorage.setItem("option", 1)
            //readReviewStar();
        }
    }



    const reviewList = (reviews) => (
        <li className="li" key={reviews._id} id={reviews._id}>
    <div class="review-block">
        <td className="id">{reviews._id}</td>
        <div id="header" >  
            <h4 className={"readReviewDetail"}>{reviews.title}</h4>
        </div>
        {/* onClick = {()=>{window.location.href ='/reviews/detail'}} */}
        <div id="writer-writeDate-star">
            <div>{reviews.userId} /
                <Moment format="YY.MM.DD">{reviews.writeDate}</Moment>
                <Progress value={reviews.star} max="5"/></div>
        </div>

        <div>
            <table class="houseInfo">
                <tr>
                    <td id="a">지역</td>
                    <td colspan="3">{reviews.region}</td>
                </tr>
                <tr>
                    <td id="a">임대종류</td>
                    <td>행복주택</td>
                    <td id="a">유형</td>
                    <td>아파트</td>
                </tr>
                <tr>
                    <td id="a">주택형</td>
                    <td>{reviews.typeName}</td>
                    <td id="a">공급수</td>
                    <td>32 세대</td>
                </tr>
                <tr>
                    <td id="a">월세</td>
                    <td>{numeral(reviews.monthlyRentCharge).format('0,0')}</td>
                    <td id="a">관리비</td>
                    <td>{numeral(reviews.adminCharge).format('0,0')}</td>
                </tr>
            </table>
        </div>

        <div class="review-image">
          <br></br>

            
            <img width="650" height="300" src={reviews.picture}></img>
           
        </div>

        <div class="review-content">
            <div id="merit">
                <div id="b">장점</div>{reviews.merit}</div>
            <div id="demerit">
                <div id="b">단점</div>{reviews.demerit}</div>
        </div>
        <br></br>
        <div className="button-container">
        <button id="review-upload" className={"readReviewDetail"}>수정/삭제</button>
        </div>
        <br></br>
      

    
    </div>


</li>
    );
    function readReview () {
        axios.get('/happyhouse/reviews').then(({data}) => {
            data = data.reviewList
            setReview(data.map(reviewList))
        })
    }
    function readReviewStar () {
        axios.get('/happyhouse/reviews/star').then(({data}) => {
            data = data.reviewList
            setReview(data.map(reviewList))
        })
    }
    function move(){
        localStorage.setItem("review_id",modalInput);
        
        window.location.href ='/reviews/detail'
    }
    $(function () {     
        
        $(".readReviewDetail").on("click", function () {

            var Button = $(this);
            var div = Button.parent().parent();
            var td = div.children();
            setModalInput(td.eq(0).text());
            console.log('아이디' +td.eq(0).text());
           
            console.log('모델인풋' +modalInput);
            move();
            
        })
    })
    // function readHouseInfo(){
    //     axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/houseid/${houseId}`);
    // } 
    useEffect(() => {
        if(localStorage.getItem("option") == 1){
      
            readReviewStar();
        }else  readReview()
        }
    );

    return (
        <div>
        <React.Fragment>
            <div className="dv">

            <div className = "review-wrap">
                <div className = "review-title">
                    <div id = "title">거주 후기</div>   
                </div>
                
                <div className = "search-button-group">
         
                    <select id = "review-search-option"  onChange={handleOptionOnChange}>
                        <option>최신순</option>
                        <option>별점순</option>
                    </select>
                    <button id="review-upload" onClick = {()=>{window.location.href ='/reviews/create'}}>UPLOAD</button>
                 
                </div>
              
            
                
                {review_list}

            </div>
{/*테스트 */}

<div class="review-item">
<div class="review-item-description-user">
<span class="review-item-description-title"><img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img><h3 class="user">userId</h3> 
</span>
</div>
{/* <div class="review-item-description-user">
<span class="review-item-description-title">
<time class="time">
            <Moment format="YY.MM.DD">10.20.22</Moment>
        </time>
</span>
</div> */}
{/* <img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img>
        <div class="profile">
            <h3 class="user">1234</h3>
            <time class="time">
            <Moment format="YY.MM.DD">10.20.22</Moment>
        </time>
            <ul class="status">
            <td className="id">2</td>
            </ul>
        </div> */}
     


{/* <img src={star3} class="bldg-img"></img> */}
<span class="starpoint">
<img  ></img>
4.0
</span>
<div class="review-item-title">
<a class="danji" target="_blank" href="/building/3db0dda56e3?title=봉천동 964-25">
봉천동 964-25
</a>
<p class="address">
서울특별시 관악구 봉천동 964-25
</p>
<span class="badge">월세: 30 </span>
<span class="badge">관리비: 3</span>
</div>
<div class="review-item-descriptions">
<div class="review-image">
          <br></br>

            
            <img width="650" height="300" ></img>
           
        </div>
<div class="review-item-description">
<span class="review-item-description-title">장점</span>
<p >장점~~~~~~~~~</p>
</div>
<div class="review-item-description">
<span class="review-item-description-title">단점</span>
<p >단점~~~~~~~~~~.</p>
</div>
<div class="review-item-description">
<span class="review-item-description-title">
<time class="time">
            <Moment format="YY.MM.DD">10.20.22</Moment>
        </time>
</span>
</div>
</div>
</div>
<fieldset class="rating">
  <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
  <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
  <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
  <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
  <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label>
  <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
  <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
  <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
  <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
  <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
{/*테스트 */}
            <div id="center">
                    <div class="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#"  class="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">&raquo;</a>
                    </div>
            </div>

        </div>

        </React.Fragment>

        <Modal isOpen={modalCreateReview}>
                <ModalHeader toggle={toggleCreateReview}>거주후기 작성</ModalHeader>
                <CreateReview></CreateReview>
            </Modal>

           
    </div>
    );
}

// const Review = (props) => {
//     return(
//         <div>
//             <React.Fragment>
//                 <div className="dv">

//                 <div className = "review-wrap">
//                     <div className = "review-title">
//                         <div id = "title">거주 후기</div>
//                     </div>

//                     <div className = "search-button-group">
//                         <select id = "review-search-option">
//                             <option>최신순</option>
//                         </select>
//                         <input id="review-search" value=""></input>
//                         <button id="review-upload">UPLOAD</button>
//                     </div>

//                     <div class="review-container">
//                         <div class="review-block">
//                             <div id="header">
//                                 <h4>[ 내곡보금자리 주택지구 도시형 생활주택 ]</h4>
//                             </div>

//                             <div id = "writer-writeDate-star">
//                                 <div>작성자/작성일/별점</div>
//                             </div>

//                             <div>
//                                 <table class="houseInfo">
//                                     <tr>
//                                         <td id="a">주소</td>
//                                         <td colspan="3">서울특별시 서초구 청계산로9길 10-3</td>
//                                     </tr>
//                                     <tr>
//                                         <td id="a">임대종류</td>
//                                         <td>행복주택</td>
//                                         <td id="a">유형</td>
//                                         <td>아파트</td>
//                                     </tr>
//                                     <tr>
//                                         <td id="a">Type</td>
//                                         <td>49A</td>
//                                         <td id="a">세대수</td>
//                                         <td>32</td>
//                                     </tr>
//                                     <tr>
//                                         <td id="a">월세</td>
//                                         <td>300,000</td>
//                                         <td id="a">관리비</td>
//                                         <td>50,000</td>
//                                     </tr>
//                                 </table>
//                             </div>

//                             <div class="review-image">
//                                 <img src={room1} id="reviewImage"></img>
//                             </div>

//                             <div class="review-content">
//                                 <div id="merit">장점 : </div>
//                                 <div id="demerit">단점 : </div>
//                             </div>
//                         </div>

//                         <div class="review-block" id = "second">
//                             <div id="header">
//                                 <h4>[ 내곡보금자리 주택지구 도시형 생활주택 ]</h4>
//                             </div>
                            
//                             <div id = "writer-writeDate-star">
//                                 <div>작성자/작성일/별점</div>
//                             </div>

//                             <div>
//                                 <table class="houseInfo">
//                                        <tr>
//                                            <td id="a">주소</td>
//                                            <td colspan="3">서울특별시 서초구 청계산로9길 10-3</td>
//                                        </tr>
//                                        <tr>
//                                            <td id="a">임대종류</td>
//                                            <td>행복주택</td>
//                                            <td id="a">유형</td>
//                                            <td>아파트</td>
//                                        </tr>
//                                        <tr>
//                                            <td id="a">Type</td>
//                                            <td>49C</td>
//                                            <td id="a">세대수</td>
//                                            <td>32</td>
//                                        </tr>
//                                        <tr>
//                                             <td id="a">월세</td>
//                                             <td>300,000</td>
//                                             <td id="a">관리비</td>
//                                             <td>50,000</td>
//                                     </tr>
//                                    </table>
//                             </div>

//                             <div class="review-image">
//                                 <img src={room2} id="reviewImage"></img>
//                             </div>

//                             <div class="review-content">
//                                 <div id="merit">장점 : </div>
//                                 <div id="demerit">단점 : </div>
//                             </div>
//                         </div>

//                     </div>

//                 </div>

//                 <div id="center">
//                         <div class="pagination">
//                             <a href="#">&laquo;</a>
//                             <a href="#"  class="active">1</a>
//                             <a href="#">2</a>
//                             <a href="#">3</a>
//                             <a href="#">4</a>
//                             <a href="#">5</a>
//                             <a href="#">&raquo;</a>
//                         </div>
//                     </div>
//             </div>

//             </React.Fragment>
//         </div>
//     )
// }

export default Review;