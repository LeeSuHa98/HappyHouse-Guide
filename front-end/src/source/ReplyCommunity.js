import React, {useEffect, useState} from 'react'; //https://github.com/imtaekh/my_app/blob/4485452eee5a48e94d2ee0b7892ef0181ba4302c/models/User.js
import $ from 'jquery';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import './css/community.css'
import Moment from 'react-moment'

function ReplyCommunity(props) {
    const [modalInput, setModalInput] = useState("0");
    const [modalInputReply, setModalInputReply] = useState("0");
    const [_id, set_id] = useState();
    const [userId, setUserId] = useState();
    const [writeDate, setWriteDate] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [reply, setReply] = useState();

    const [activityHistoryList, setActivityHistoryList] = useState();

    const handleChangeUserId = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    }
    const handleChangeWriteDate = (e) => {
        e.preventDefault();
        setWriteDate(e.target.value);
    }
    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleChangeReply = (e) => {
        e.preventDefault();
        setReply(e.target.value);
    }


const replyList = (community) => (

    <li class="article" key={community._id} id={community._id}>
        <img src="https://cf-fpi.everytime.kr/0.png" class="picture-medium"></img>
        <div class="profile">
            <h3 class="user">{community.userId}</h3>

            <ul class="status">
                <td className="id">{community._id}</td>

                <li className={"deleteReply"}>삭제</li>
            </ul>

        </div>

        <p class="reply">
            {community.content}</p>
        <time class="time">
            <Moment format="YY.MM.DD">{community.writeDate}</Moment>
        </time>
        <br></br>

    </li>
);
const handReply = () => { //댓글등록
    let newDate = new Date();
    var form = {
        title: "[댓글]",
        content: reply,
        userId: localStorage.getItem("userID"),
        groupId: localStorage.getItem("groupId"),
        replyOrder: 0,
        replyStep: 1,
        writeDate: newDate,
        numberOfView: 0
    };
    console.log(form);
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/create', form)
        .then((res) => {
            alert("댓글 작성 완료")
            window
                .location
                .reload();
            props.toggle()
        })
        .catch(function (error) {
            console.log(error)

        })
    }

const readCommunity = () => { //게시글 정보

    var form = {
        _id: localStorage.getItem("community_id")
    };
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/detail', form)
        .then((res) => {

            console.log(res.data);
            console.log(res.data.communitys.userId);
            set_id(res.data.communitys._id);
            setUserId(res.data.communitys.userId);
            setWriteDate(res.data.communitys.writeDate);
            setTitle(res.data.communitys.title);
            setContent(res.data.communitys.content);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

const readReply = () => { //댓글 목록 조회

    var form = {
        groupId: localStorage.getItem("groupId")
    };
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/reply', form)
        .then(({data}) => {
            data = data.communitysList
            setActivityHistoryList(data.map(replyList))

        })
        .catch(function (error) {
            console.log(error);
        })
    }
const deleteCommunity = () => { //게시글 삭제
    var form = {
        _id: modalInput
    };
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/delete', form)
        .then((res) => {
            // alert("댓글 삭제 완료");
            window.location.href = '/communities'
        })
}
const deleteReply = () => { //댓글 삭제
    var form = {
        _id: modalInput
    };
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/delete', form)
        .then((res) => {
            // alert("댓글 삭제 완료");
            window.location.href = '/communities/reply'
        })
}

useEffect(() => {

    readCommunity(); //게시글 상세조회
    readReply(); //댓글 목록 조회
}, [])

    $(function () {
       
        $(".deleteReply").on("click", function () {  //댓글 삭제

            var Button = $(this);

            var ul = Button.parent();
            var td = ul.children();
            setModalInput(td.eq(0).text());
           console.log(modalInput);
           if(modalInput !=0){
               deleteReply();
           }
        })     
        $(".deleteCommunity").on("click", function () {  //댓글 삭제

            var Button = $(this);

            var ul = Button.parent();
            var td = ul.children();
            setModalInput(td.eq(0).text());
           console.log(modalInput);
           if(modalInput !=0){
               deleteCommunity();
           }
        })   
          $(".readCommunityDetail").on("click", function () {

            var Button = $(this);
            var ul = Button.parent();
            var td = ul.children();
            setModalInput(td.eq(0).text());
            localStorage.setItem("community_id",modalInput);
            if(localStorage.getItem("community_id")!="0"){
                window.location.href ='/communities/detail'
            }
        })
    })


    return (
       
        <div className="dv">
    
  <div className="createCommunity">
                <div className="community-title">
                    <div id="title">커뮤니티</div>
                </div>
                
            </div>
            <br></br>
                <div class="community-block">
                <ul class="status">
               <td className="id">{_id}</td>            
                <li className={"deleteCommunity"}>삭제</li>
            </ul>
            <ul class="status">
            <td className="id">{_id}</td>            
                <li className={"readCommunityDetail"}>수정</li>
            </ul>
                    <td id="header">
                        <h4>
                            <td name="title">{title}</td>
                        </h4>
                      
                    </td>
                    <div>
                    <table class="houseInfo">
                        <tr>
                            <td id="a">작성자</td>
                            <td>{userId}</td>
                            <td id="a">작성일</td>
                            <td>
                                <Moment format="YY.MM.DD">{writeDate}</Moment>
                            </td>
                        </tr>
                    </table>
                </div>
                     <div class="community-content">
                        <td
                            name="content"
                            type="textarea"
                            Rows="7"
                            >{content}</td>
                    </div>  
                    <br></br>
                   <div className="button-container">
                  <button id="review-upload" onClick = {()=>{window.location.href ='/communities'}} style={{float: 'left'}}>글목록</button>
                </div> 
                    
                    <br></br>
                 </div> 
              
                <br>
                </br>
                
                 {activityHistoryList}
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                     <Input name="reply" id="reply" placeholder="댓글을 입력하세요" onChange={handleChangeReply}></Input>
                     <InputGroupAddon addonType="append">
                    <Button color="primary" onClick = {()=> handReply()}>등록</Button>
                      </InputGroupAddon>
                    </InputGroup>
        </div>

    )
}
export default ReplyCommunity;
