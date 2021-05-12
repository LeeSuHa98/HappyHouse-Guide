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
import './community.css'
import Moment from 'react-moment'

function ReadCommunity(props) {

    const [_id, set_id] = useState(props._id);
    const [userId, setUserId] = useState(props);
    const [writeDate, setWriteDate] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    // const [reply, setReply] = useState(); //댓글작성내용
    // const [modalInput, setModalInput] = useState("default");
    // const [tableData, setTableData] = useState(); //댓글 목록 조회
    // const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화

    // const [modalCreateReply, setModalCreateReply] = useState(false);
    // const [modalDeleteReply, setModalDeleteReply] = useState(false);

    // const toggleCreateReply = () => setModalCreateReply(!modalCreateReply);
    // const toggleDeleteReply = () => setModalDeleteReply(!modalDeleteReply);

    // let replyArrays = []; //댓글 목록 테이블
    // function setReplyArrays(newArrays) {
    //     replyArrays = newArrays;
    // }
    // const renderInput = (replyArray, index) => {

    //     return (

    //         <tr key={index}>
    //             <Input type="hidden" value={replyArray.postId}></Input>
    //             <td>{replyArray.title}</td>
    //             <td>{replyArray.usreId}</td>
    //             <td>{replyArray.content}</td>
    //             <td className="text-nowrap">
    //                 <Button className={"createReplyButton"}>{"댓글"}</Button>
    //                 <Button className={"deleteReplyButton"}>{"삭제"}</Button>
    //             </td>
    //         </tr>

    //         // <td className="text-nowrap"><Button className={"deleteReplyButton"}
    //         // color={"primary"} >{"수정"}</Button></td>
    //     ) //<h1>props.activityHistoryCode : {activityHistoryCode}</h1>
    // } //댓글 목록 조회시 보일것 (댓글작성자, 댓글내용, 댓글 작성날짜)

    // const handleReplyOnChange = (e) => {
    //     e.preventDefault();
    //     setReply(e.target.value);
    // }
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

    // const toggleIsReadOnly = () => {
    //     setIsReadOnly(!isReadOnly);
    // }

    const readCommunity = () => {

        var form = {
            _id: localStorage.getItem("community_id")
        };
        axios
            .post('/happyhouse/communities/:id', form)
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

    // function getReplyList(form) {
    //     var form = new FormData;

    //     // form.append("postId", postId);
    //     axios
    //         .post('/community/readReply', form)
    //         .then((response) => {

    //             setReplyArrays(response.data);
    //             setTableData(replyArrays.map(renderInput));
    //         });
    // }
    // const updateCommunity = () => {
    //     var form = new FormData;

      
    //     form.append("title", title);
    //     form.append("content", content);

    //     axios
    //         .post('/community/updatePost', form, {
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
    // const deleteCommunity = () => {
      
 
    //     axios
    //         .delete('/happyhouse/communities/:id',{
    //             data:{
    //                 _id: _id
    //             }
    //         })
    //         .then((res) => {
           
    //             alert("게시글이 삭제 완료")
    //             window.location.reload();
    //             props.toggle()
                
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //     }
    // const createReply = () => {
    //     var form = new FormData;
    //     form.append('userToken', localStorage.getItem("userToken"));
    //     // form.append('postId', postId);
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

    

    // $(function () {

    //     $(".deleteReply").off("click")
    //     $(".deleteReplyButton").on("click", function () {

    //         var postButton = $(this);

    //         var tr = postButton
    //             .parent()
    //             .parent();
    //         var td = tr.children();
    //         console.log("row데이터 : " + tr.eq(0).text());
    //         setModalInput(td.eq(0).val());
    //         toggleDeleteReply();
    //     })

    //     $(".createReply").off("click")
    //     $(".createReplyButton").on("click", function () {

    //         var postButton = $(this);

    //         var tr = postButton
    //             .parent()
    //             .parent();
    //         var td = tr.children();
    //         console.log("row데이터 : " + tr.eq(0).text());
    //         setModalInput(td.eq(0).val());
    //         toggleCreateReply();
    //     })
    // })
    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        readCommunity(); //게시글 상세조회
       // getReplyList(form);
    }, [])
    return (
        <div className="dv">   

                            <table class="houseInfo">
                                <tr>
                                    <td id="header">제목</td>
                                    <h4>
                                        <Input
                                            name="userId"
                                            onChange={handleChangeTitle}
                                            value={title}
                                           ></Input>
                                    </h4>
                                </tr>
                              
                                <tr>
                                    <td id="header">내용</td>
                                    <Input
                                        name="content"
                                        cols="50"
                                        rows="10"
                                        onChange={handleChangeContent}
                                        value={content}
                                     ></Input>
                                </tr>

                            </table>

                            <div className="button-container">
                            <button id="community-upload" style={{float: 'left'}}>수정</button>
                            <button id="community-upload" style={{float: 'left'}}>완료</button>

                            <button id="community-upload" style={{float: 'right'}}>삭제</button>
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
                    onClick={createReply}>{"댓글작성"}</Button> */}
            </div>
    
    )
}
export default ReadCommunity;
