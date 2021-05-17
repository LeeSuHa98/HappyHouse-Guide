import React, {useEffect, useState} from 'react';
// import '../Css/test.css'; import DeleteReply from './DeleteReply.js'; import
// CreateReply from './CreateReply.js';
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

function ReadCommunity(props) {

    const [_id, set_id] = useState(props._id);
    const [userId, setUserId] = useState(props);
    const [writeDate, setWriteDate] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
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
    const handleChangeContent = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    // const toggleIsReadOnly = () => {     setIsReadOnly(!isReadOnly); }

    const readCommunity = () => {

        var form = {
            _id: localStorage.getItem("community_id")
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/detail', form)
            .then((res) => {

                console.log(res.data);
                console.log(res.data.communitys.userId);
                setUserId(res.data.communitys.userId);
                setWriteDate(res.data.communitys.writeDate);
                setTitle(res.data.communitys.title);
                setContent(res.data.communitys.content);
            })
            .catch(function (error) {
                console.log(error);
            })
        }

//   function getReplyList(form) {
//     var form = new FormData;
//     form.append("postId", postId);
//     axios
//         .post('/community/readReply', form)
//         .then((response) => {
//             setReplyArrays(response.data);
//             setTableData(replyArrays.map(renderInput));
//         });
// }
const updateCommunity = () => {
   // let newDate = new Date();
    var form = {
        userId: localStorage.getItem("userID"),
        _id: localStorage.getItem("community_id"),
        title: title,
        content: content,
       // writeDate: writeDate
    };
    
    console.log('수정커뮤니티', form);
    
    axios
    .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/update', form).then((res) => {
       
        alert("게시글 수정 완료")
        window.location.href ='/communities'
    })
}
const deleteCommunity = () => {
    var form = {
        _id: localStorage.getItem("community_id")
    };
    axios
        .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/delete', form)
        .then((res) => {
            alert("커뮤니티 삭제 완료");
            window.location.href = '/communities'
        })
}
// const createReply = () => {
//     var form = new FormData;
//     form.append('userToken', localStorage.getItem("userToken"));
//     form.append('postId', postId);
//     form.append('reply', reply);
//     axios
//         .post("/community/createReply", form, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         })
//         .then((response) => {
//             window
//                 .location
//                 .reload();
//         })
// }

    useEffect(() => {
    
        readCommunity(); //게시글 상세조회
        // getReplyList(form);
    }, [])
    return (
       
        <div className="dv">
    
  <div className="createCommunity">
                <div className="community-title">
                    <div id="title">커뮤니티 작성</div>
                </div>

            </div>
            
                <div class="community-block">
                   
                    <td id="header">
                        <h4>
                            <Input name="title" onChange={handleChangeTitle} value={title}></Input>
                        </h4>
                    </td>
{/* 
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
    */}
                     <div class="community-content">
                        <Input
                            name="content"
                            type="textarea"
                            Rows="7"
                            onChange={handleChangeContent}
                            value={content}></Input>
                    </div>  
                    <br></br>
                   <div className="button-container">
                <button id="review-upload" onClick={updateCommunity}>수정</button>
                  <button id="review-upload" onClick={deleteCommunity}>삭제</button>
                  <button id="review-upload" onClick = {()=>{window.location.href ='/communities'}} style={{float: 'left'}}>취소</button>
                </div> 
                    
                    <br></br>
                 </div> 

        
           

            {/* <Modal isOpen={modalCreateReply}>
                        <ModalHeader toggle={toggleCreateReply}>댓글 등록</ModalHeader>

                         <CreateReply postId={modalInput}></CreateReply>
            </Modal>
            <Modal isOpen={modalDeleteReply}>
                        <ModalHeader toggle={toggleDeleteReply}>댓글 삭제</ModalHeader>

                         <DeleteReply postId={modalInput}></DeleteReply>
            </Modal> */
            }
            {/* <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>댓글</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="textarea"
                        name="content"
                        placeholder="댓글"
                        onChange={handleReplyOnChange}
                        value={reply}></Input>
                </InputGroup>
                <Button
                    className="btn btn-primary btn-block w-25"
                    color={"primary"}
                    style={{
                        float: 'right'
                    }}
                    type="post"
                    onClick={createReply}>{"댓글작성"}</Button> */
            }
        </div>

    )
}
export default ReadCommunity;
