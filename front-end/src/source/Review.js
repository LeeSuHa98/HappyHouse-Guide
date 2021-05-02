import React, {useState, useEffect} from 'react';
import {
    Button,
    Progress,
    Table
} from 'reactstrap';
import axios from 'axios'
import './Review.css'

import room1 from'../Image/room1.PNG'
import room2 from'../Image/room2.PNG'

export const Review = (props) => {
    return(
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
                        <div class="review-block">
                            <div id="header">
                                <h4>[ 내곡보금자리 주택지구 도시형 생활주택 ]</h4>
                            </div>

                            <div id = "writer-writeDate-star">
                                <div>작성자/작성일/별점</div>
                            </div>

                            <div>
                                <table class="houseInfo">
                                    <tr>
                                        <td id="a">주소</td>
                                        <td colspan="3">서울특별시 서초구 청계산로9길 10-3</td>
                                    </tr>
                                    <tr>
                                        <td id="a">임대종류</td>
                                        <td>행복주택</td>
                                        <td id="a">유형</td>
                                        <td>아파트</td>
                                    </tr>
                                    <tr>
                                        <td id="a">Type</td>
                                        <td>49A</td>
                                        <td id="a">세대수</td>
                                        <td>32</td>
                                    </tr>
                                    <tr>
                                        <td id="a">월세</td>
                                        <td>300,000</td>
                                        <td id="a">관리비</td>
                                        <td>50,000</td>
                                    </tr>
                                </table>
                            </div>

                            <div class="review-image">
                                <img src={room1} id="reviewImage"></img>
                            </div>

                            <div class="review-content">
                                <div id="merit">장점 : </div>
                                <div id="demerit">단점 : </div>
                            </div>
                        </div>

                        <div class="review-block" id = "second">
                            <div id="header">
                                <h4>[ 내곡보금자리 주택지구 도시형 생활주택 ]</h4>
                            </div>
                            
                            <div id = "writer-writeDate-star">
                                <div>작성자/작성일/별점</div>
                            </div>

                            <div>
                                <table class="houseInfo">
                                       <tr>
                                           <td id="a">주소</td>
                                           <td colspan="3">서울특별시 서초구 청계산로9길 10-3</td>
                                       </tr>
                                       <tr>
                                           <td id="a">임대종류</td>
                                           <td>행복주택</td>
                                           <td id="a">유형</td>
                                           <td>아파트</td>
                                       </tr>
                                       <tr>
                                           <td id="a">Type</td>
                                           <td>49C</td>
                                           <td id="a">세대수</td>
                                           <td>32</td>
                                       </tr>
                                       <tr>
                                            <td id="a">월세</td>
                                            <td>300,000</td>
                                            <td id="a">관리비</td>
                                            <td>50,000</td>
                                    </tr>
                                   </table>
                            </div>

                            <div class="review-image">
                                <img src={room2} id="reviewImage"></img>
                            </div>

                            <div class="review-content">
                                <div id="merit">장점 : </div>
                                <div id="demerit">단점 : </div>
                            </div>
                        </div>

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
    )
}

export default Review;