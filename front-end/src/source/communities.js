import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './css/community.css'
import $ from 'jquery';
import {Modal, ModalHeader} from 'reactstrap';
import CreateCommunity from './CreateCommunity'
import ReadCommunity from './ReadCommunity';
import Moment from 'react-moment'
import Pagination from '../source/Pagination'
import {useMediaQuery} from "react-responsive";

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
    const [activityHistoryListOfMobile, setActivityHistoryListOfMobile] = useState();    
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [pageSize, setPageSize] = useState(3);
    
    const handlePageChange = (page) => {
        localStorage.setItem("page", page);
        window.location.reload();
    }

    const communityList = (community) => (
        <li className="li" key={community._id} id={community._id}>

            <div class="community-block" id="second" onClick>
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
                </div>
                <br></br>
            </div>
        </li>
    );

    const communityListOfMobile = (community) => (

        <li className="li" key={community._id} id={community._id}>
        
            <div class="community-block readCommunityReplyOnMobile" id="second">
                <td className="id">{community._id}</td>
                <td className="id">{community.writeDate}</td>

                <img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img>
                <div class="profile">
                    <h3 class="user">{community.userId}</h3>
                    <Moment format="작성일 : YYYY.MM.DD" className ="writeDate">{community.writeDate}</Moment>
                    
                </div>

                <td id="header" className={"readCommunity"}>
                    <h4 className = "header-title">{community.title}</h4>
                </td>

                <div class="community-content">
                    {community.content}
                </div>
            </div>
        </li>
    );

    function readCommunityCount() {

        axios
            .get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities')
            .then(({data}) => {
                setCount(data.count);
            })
    }
    function readActivityHistory() {
        var form={
           page: localStorage.getItem("page")
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/page',form)
            .then(({data}) => {
                console.log(page);
                data = data.communitysList
                setActivityHistoryList(data.map(communityList))
                setActivityHistoryListOfMobile(data.map(communityListOfMobile))
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
        
        $(".readCommunityReplyOnMobile").on("click", function () {

            var li = $(this);
            var div = li.children();
            setModalInput(div.eq(0).text());
            setModalInputReply(div.eq(1).text());
            localStorage.setItem("community_id",modalInput);
            localStorage.setItem("groupId",modalInputReply);
            if(localStorage.getItem("community_id")!="0" && localStorage.getItem("groupId")!="0"){
                window.location.href ='/communities/reply'
            }
        })
    })

    useEffect(() => {
        readCommunityCount();
        readActivityHistory(); 
    }, []);

    

    const isPc = useMediaQuery({query: "(min-width: 601px)"})
    const isMobile = useMediaQuery({query: "(max-width: 600px"})


    return (
        <div className="dv">
            <div className="createCommunity">
                <div className="community-title">
                    <div id="title">커뮤니티</div>
                </div>
                {isPc&&
                <div className="search-button-group-com">
                    <select id="community-search-option">
                        <option>제목</option>
                    </select>
                    <button id="community-upload" className={"createCommunityButton"}>글쓰기</button>
                </div>
                }
                {isMobile&&
                
                <div className="search-button-group-com">
                    <select id="community-search-option">
                        <option>제목</option>
                    </select>
                    <button id="community-upload" className={"createCommunityButton"}>글쓰기</button>
                </div>
                }
            </div>

            { isPc && activityHistoryList}
            { isMobile && activityHistoryListOfMobile}

            <div id="center">
                <div class="pagination">
            
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