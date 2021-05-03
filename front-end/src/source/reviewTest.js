import React, {useState, useEffect} from 'react';
import {
    Button,
    Progress,
    Table
} from 'reactstrap';
import axios from 'axios'
import Moment from 'react-moment'
import numeral from 'numeral'
import './Review.css'

import room1 from'../Image/room1.PNG'
import room2 from'../Image/room2.PNG'

const Review =(props)=>{
    useEffect(() => {
            readReview()
        }
    );
    
    const [review_list, setReview] = useState();
    const reviewList = (reviews) => (
                    <div class="review-block">
                        <div id="header">
                            <h4>{reviews.title}</h4>
                        </div>

                        <div id = "writer-writeDate-star">
                            <div>{reviews.userId} / <Moment format="YY.MM.DD">{reviews.writeDate}</Moment> <Progress value={reviews.star} max="5" /></div>
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
                            <img src={room1} id="reviewImage"></img>
                        </div>

                        <div class="review-content">
                            <div id="merit"><div id="b">장점</div>{reviews.merit}</div>
                            <div id="demerit"><div id="b">단점</div>{reviews.demerit}</div>
                        </div>
                    </div>
    );
    
    function readReview () {
        axios.get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews').then(({data}) => {
            data = data.reviewList
            setReview(data.map(reviewList))
        })
    }

    // function readHouseInfo(){
    //     axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/houseid/${houseId}`);
    // } 

    return (
        <div>
        <React.Fragment>
            <div className="dv">

            <div className = "review-wrap">
                <div className = "review-title">
                    <div id = "title">거주 후기</div>
                </div>

                <div className = "search-button-group">
                    <select id = "review-search-option">
                        <option>최신순</option>
                    </select>
                    <input id="review-search" value=""></input>
                    <button id="review-upload">UPLOAD</button>
                </div>

                <div class="review-container">
                    {review_list}
                </div>

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