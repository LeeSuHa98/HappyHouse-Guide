import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Moment from 'react-moment'
import numeral from 'numeral'
import './css/Review.css'
import $ from 'jquery';
import {Modal, ModalHeader} from 'reactstrap';
import star3 from '../Image/star3.png'
import Pagination from '../source/Pagination'
import SearchHouse from '../source/SearchHouse'
const Review = (props) => {

    const [modalInput, setModalInput] = useState("0");
    const [modalInputCode, setModalInputCode] = useState("0");
    const [modalInputWriterId, setModalInputWriterId] = useState("0");
    const [modalCreateReview, setModalCreateReview] = useState(false);
    const toggleCreateReview = () => setModalCreateReview(!modalCreateReview);
    const [review_list, setReview] = useState();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [pageSize, setPageSize] = useState(3); 
    const handleOptionOnChange = (e) => {
        e.preventDefault();
        if (e.target.value === "최신순") {
            localStorage.setItem("option", 0)

            readReview();
        } else {
            localStorage.setItem("option", 1)

            readReviewStar();
        }
    }

    const handlePageChange = (page) => {
        localStorage.setItem("page", page);
        if (localStorage.getItem("option") == 1) {

            readReviewStar();
        } else 
            readReview()
    }

    const reviewList = (reviews) => (
        <li className="li" key={reviews._id} id={reviews._id}>
            <div class="review-block">
                <td className="id">{reviews._id}</td>
                <td className="id">{reviews.danjiCode}</td>
                <td className="id">{reviews.userId}</td>
                <div id="header">
                    <h4 className="header-title">{reviews.title}</h4>
                </div>
                <div class="review-item-description-date">
                    <span class="review-item-description">
                        <time class="time">
                            <Moment format="YY.MM.DD">{reviews.writeDate}</Moment>
                        </time>
                    </span>
                </div>

                <div class="review-item-description-user">
                    <span class="review-item-description-title">
                        <img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img>
                        <h3 class="user">{reviews.userId}</h3>
                    </span>
                </div>
                <div id="writer-writeDate-star">
                    <span class="starpoint">
                        <img src={star3}></img>
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

                    <img class="review-image" src={reviews.picture}></img>

                </div>

                <div class="review-content">
                    <div id="merit">
                        <div id="b">장점</div>{reviews.merit}</div>
                    <div id="demerit">
                        <div id="b">단점</div>{reviews.demerit}</div>
                </div>
                <br></br>
                <div className="button-container">
                    <button id="review-upload" className={"readReviewDetail"} onClick={readReviewDetail}>수정/삭제</button>
                </div>
                <br></br>

            </div>

        </li>
    );
    function readReviewCount() {

        axios
            .get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews')
            .then(({data}) => {
                setCount(data.count);
            })
    }
    function readReview() {
        var form = {
            page: localStorage.getItem("page")
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/date', form)
            .then(({data}) => {
                data = data.reviewList
                setReview(data.map(reviewList))
            })
    }
    function readReviewStar() {
        var form = {
            page: localStorage.getItem("page")
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/star', form)
            .then(({data}) => {
                data = data.reviewList
                setReview(data.map(reviewList))
            })
    }
    function readReviewDetail() {
      
     
       if (localStorage.getItem("review_id") != "0"&& localStorage.getItem("danjiCode")!="0") {
        if(localStorage.getItem("userID")!=localStorage.getItem("writerId")){
                    
            alert("수정 권한이 없습니다.")
            window.location.href = '/reviews'
        }else{
            window.location.href = '/reviews/detail'
        }
    }
    }
    $(function () {
        $(".createReviewButton").on("click", function () {

            toggleCreateReview();
        })
        $(".readReviewDetail").on("click", function () {

            var Button = $(this);
            var div = Button
                .parent()
                .parent();
            var td = div.children();
            setModalInput(td.eq(0).text());
            localStorage.setItem("review_id", modalInput);
            setModalInputCode(td.eq(1).text());
            localStorage.setItem("danjiCode",modalInputCode);
            setModalInputWriterId(td.eq(2).text());
            localStorage.setItem("writerId",modalInputWriterId);

        })
    })
    useEffect(() => {
        readReviewCount();
        if (localStorage.getItem("option") == 1) {

            readReviewStar();
        } else 
            readReview()

    },[]);

    return (
        <div>
            <React.Fragment>
                <div className="dv">

                    <div className="review-wrap">
                        <div className="review-title">
                            <div id="title">거주 후기</div>
                        </div>

                        <div className="search-button-group">

                            <select id="review-search-option" onChange={handleOptionOnChange}>
                                <option>최신순</option>
                                <option>별점순</option>
                            </select>
                            <button
                                id="review-upload"
                                className={"createReviewButton"}>거주후기 작성하기</button>
                        </div>

                        {review_list}

                    </div>

                    <div id="center">
                        <div class="pagination">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={1}
                                onPageChange={handlePageChange}/>
                        </div>
                    </div>

                </div>

            </React.Fragment>

            <Modal isOpen={modalCreateReview}>
                <ModalHeader toggle={toggleCreateReview}>주택 검색</ModalHeader>
                <SearchHouse></SearchHouse>
            </Modal>

        </div>
    );
}

export default Review;