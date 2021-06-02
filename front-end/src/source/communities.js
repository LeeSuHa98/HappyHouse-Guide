import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './css/community.css'
import $ from 'jquery';
import {Modal, ModalHeader} from 'reactstrap';
import CreateCommunity from './CreateCommunity'
import ReadCommunity from './ReadCommunity';
import Moment from 'react-moment'
import Pagination from '../source/Pagination'
const Communities = (props) => {
    const [modalInput, setModalInput] = useState("0");
    const [modalInputReply, setModalInputReply] = useState("0");
    const [modalCreateCommunity, setModalCreateCommunity] = useState(false);
    const [modalReadCommunity, setModalReadCommunity] = useState(false);
    const toggleCreateCommunity = () => setModalCreateCommunity(
        !modalCreateCommunity
    );
    const toggleReadCommunity = () => setModalReadCommunity(!modalReadCommunity);

    const [activityHistoryList, setActivityHistoryList] = useState();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [pageSize, setPageSize] = useState(2);
    
    const handlePageChange = (page) => {
        localStorage.setItem("page", page);
        window.location.reload();
    }

    const communityList = (community) => (

        <li className="li" key={community._id} id={community._id}>

            <div class="community-block" id="second">
                <td className="id">{community._id}</td>
                <td className="id">{community.writeDate}</td>
                <td id="header" className={"readCommunity"}>
                    <h4>[{community.title}]</h4>
                </td>

                <div>
                    <table class="houseInfo">
                        <tr>
                            <td id="a">작성자</td>
                            <td>{community.userId}</td>
                            <td id="a">작성일</td>
                            <td>
                                <Moment format="YY.MM.DD">{community.writeDate}</Moment>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="community-content">
                    {community.content}
                </div>
                <br></br>
                <div className="button-container">
                    <button id="review-upload" className={"readCommunityReply"}>댓글</button>
                    {/* <button id="review-upload" className={"readCommunityDetail"}>수정/삭제</button> */}
                </div>
                <br></br>
            </div>
        </li>
    );

    function readCommunityCount() {

        axios
            .get('/happyhouse/communities')
            .then(({data}) => {
                setCount(data.count);
            })
    }
    function readActivityHistory() {
        var form={
           page: localStorage.getItem("page")
        };
        axios
            .post('/happyhouse/communities/page',form)
            .then(({data}) => {
                console.log(page);
                data = data.communitysList
                setActivityHistoryList(data.map(communityList))

            })
    }
    $(function () {
        $(".readCommunity").off("click")
        $(".createCommunityButton").on("click", function () {

            var Button = $(this);

            var div = Button.parent();
            var td = div.children();
            setModalInput(td.eq(0).text());
            toggleCreateCommunity();
        })
        $(".readCommunityDetail").on("click", function () {

            var Button = $(this);
            var div = Button.parent().parent();
            var td = div.children();
            setModalInput(td.eq(0).text());
            localStorage.setItem("community_id",modalInput);
            localStorage.setItem("groupId",modalInputReply);
            if(localStorage.getItem("community_id")!="0"){
                window.location.href ='/communities/detail'
            }
        
        })
        $(".readCommunityReply").on("click", function () {

            var Button = $(this);
            var div = Button.parent().parent();
            var td = div.children();
            setModalInput(td.eq(0).text());
            setModalInputReply(td.eq(1).text());
            localStorage.setItem("community_id",modalInput);
            localStorage.setItem("groupId",modalInputReply);
            if(localStorage.getItem("community_id")!="0" && localStorage.getItem("groupId")!="0"){
                window.location.href ='/communities/reply'
            }
        })
    })

    useEffect(() => {
        readCommunityCount();
        readActivityHistory(); //getlist
    }, []);
    return (
        <div className="dv">
            <div className="createCommunity">
                <div className="community-title">
                    <div id="title">커뮤니티</div>
                </div>

                <div className="search-button-group">
                    <select id="community-search-option">
                        <option>제목</option>
                    </select>
                    <input id="community-search" value=""></input>
                    <button id="community-upload" className={"createCommunityButton"}>UPLOAD</button>
                </div>

            </div>

            {activityHistoryList}

            <div id="center">
                <div class="pagination">
                  
                   
                    {/* <a onClick={pageChange1}>&laquo;</a>
                    <a onClick={pageChange1}>1</a>
                    <a onClick={pageChange2}>2</a>
                    <a onClick={pageChange3}>3</a>
                    <a onClick={pageChange4}>4</a>
                    <a onClick={pageChange5}>5</a>
                    <a onClick={pageChange5}>&raquo;</a> */}
                     <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={1}
                                onPageChange={handlePageChange}/>           
                  
                </div>
            </div>

            <Modal isOpen={modalCreateCommunity} >
                <ModalHeader toggle={toggleCreateCommunity}>커뮤니티</ModalHeader>
                <CreateCommunity></CreateCommunity>
            </Modal>

            <Modal isOpen={modalReadCommunity}>
                <ModalHeader toggle={toggleReadCommunity}>커뮤니티</ModalHeader>
                <ReadCommunity _id={modalInput}></ReadCommunity>
            </Modal>

        </div>
    );
}
export default Communities;