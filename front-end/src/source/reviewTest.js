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
import star3 from '../Image/star3.png'


const Review =(props)=>{
    
    const [option,setOption] =useState(0);
    const [modalInput, setModalInput] = useState();
    const [modalCreateReview, setModalCreateReview] = useState(false);
    const toggleCreateReview = () => setModalCreateReview(!modalCreateReview);
  //  const toggleReadReview = () => setModalReadReview(!modalReadReview);
    const [review_list, setReview] = useState();

    const handleOptionOnChange = (e) => { 
        e.preventDefault();
        if(e.target.value === "최신순")
        {         
            localStorage.setItem("option", 0)
        }else if(e.target.value=="별점순"){
            localStorage.setItem("option", 1)
        }
    }



    const reviewList = (reviews) => (
        <li className="li" key={reviews._id} id={reviews._id}>
    <div class="review-block">
        <td className="id">{reviews._id}</td>
        <div id="header" >  
            <h4 className={"readReviewDetail"}>{reviews.title}</h4>
        </div>
        <div class="review-item-description-date">
<span class="review-item-description">
<time class="time">
            <Moment format="YY.MM.DD">{reviews.writeDate}</Moment>
        </time>
</span>
</div>

<div class="review-item-description-user">
<span class="review-item-description-title"><img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img><h3 class="user">{reviews.userId}</h3> 
</span>
</div>
        <div id="writer-writeDate-star">
        <span class="starpoint">
<img src={star3} ></img>
{reviews.star}
</span>
            
                
        </div>

        <div>
            <table class="houseInfo">
                <tr>
                    <td id="a">단지명</td>
                    <td colspan="3">{reviews.danjiName}</td>
                </tr>
                <tr>
                    <td id="a">지역</td>
                    <td>{reviews.region}</td>
                    <td id="a">임대종류</td>
                    <td>행복주택</td>                    
                </tr>
                <tr>
                    <td id="a">유형</td>
                    <td>{reviews.houseType}</td>
                    <td id="a">주택형</td>
                    <td>{reviews.typeName}</td>
                    
                </tr>
                <tr>
                    <td id="a">월세</td>
                    <td>{numeral(reviews.monthlyRentCharge).format('0,0')}</td>
                    <td id="a">관리비</td>
                    <td>{numeral(reviews.adminCharge).format('0,0')}</td>
                </tr>
            </table>
        </div>

        <div >
          <br></br>

            
            <img  class="review-image" src={reviews.picture}></img>
           
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
        axios.get('/happyhouse/reviews/sort').then(({data}) => {
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

    useEffect(() => {
        // if(localStorage.getItem("option") == 0){
      
        //     readReview()
        // }else  readReviewStar();
        // }
      
        readReview()
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
                    {/* <select id = "review-search-option">
                        <option >최신순</option>
                        <option>별점순</option>
                    </select> */}
                    <select  id = "review-search-option" onChange={handleOptionOnChange}>
                    <option>최신순</option>
                        <option>별점순</option>
                        </select>
                    <input id="review-search" value=""></input>
                    <button id="review-upload" onClick = {()=>{window.location.href ='/reviews/create'}}>UPLOAD</button>
                </div>

                {review_list}

            </div>

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

export default Review;