import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './community.css'
import $ from 'jquery';
import {Modal, ModalHeader} from 'reactstrap';
import CreateCommunity from './CreateCommunity'
import ReadCommunity from './ReadCommunity';
import Moment from 'react-moment'

const Communities = (props) => {
    const [modalInput, setModalInput] = useState("default");
    const [modalCreateCommunity, setModalCreateCommunity] = useState(false);
    const [modalReadCommunity, setModalReadCommunity] = useState(false);
    const toggleCreateCommunity = () => setModalCreateCommunity(
        !modalCreateCommunity
    );
    const toggleReadCommunity = () => setModalReadCommunity(!modalReadCommunity);

    const [activityHistoryList, setActivityHistoryList] = useState();

    const communityList = (community) => (

        <li className="li" key={community._id} id={community._id}>

            <div class="community-block" id="second">
                <td className="id">{community._id}</td>
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
                    <button id="review-upload" className={"readCommunityDetail"}>수정/삭제</button>
                </div>
                <br></br>
            </div>
        </li>
    );

    function readActivityHistory() {
        axios
            .get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities')
            .then(({data}) => {
                data = data.communitysList
                setActivityHistoryList(data.map(communityList))

            })
    }
    function move(){
        localStorage.setItem("community_id",modalInput);
        window.location.href ='/communities/detail'
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
            move();
        })
    })

    useEffect(() => {
        readActivityHistory() //getlist
    }, []);
    return (
        <div className="dv">
            <div className="createCommunity">
                <div className="community-title">
                    <div id="title">커뮤니티</div>
                </div>

                <div className="search-button-group">
                    <select id="community-search-option">
                        <option>최신순</option>
                    </select>
                    <input id="community-search" value=""></input>
                    <button id="community-upload" className={"createCommunityButton"}>UPLOAD</button>
                </div>

            </div>

            {activityHistoryList}

            <div id="center">
                <div class="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#" class="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">&raquo;</a>
                </div>
            </div>

            <Modal isOpen={modalCreateCommunity} >
                <ModalHeader toggle={toggleCreateCommunity}>게시글 작성</ModalHeader>
                <CreateCommunity></CreateCommunity>
            </Modal>

            <Modal isOpen={modalReadCommunity}>
                <ModalHeader toggle={toggleReadCommunity}>게시글 상세조회</ModalHeader>
                <ReadCommunity _id={modalInput}></ReadCommunity>
            </Modal>

        </div>
    );
}
export default Communities;