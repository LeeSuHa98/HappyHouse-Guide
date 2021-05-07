import React, {useEffect, useState} from 'react';
//import '../Css/test.css';
//import DeleteReply from './DeleteReply.js';
//import CreateReply from './CreateReply.js';
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


function ReadCommunity(props){

    const [postId, setPostId] = useState(
        props.postId
    );
    
    const [writerId, setWriterId] = useState();
    const [writeDate, setWriteDate] =useState();    
    const [title, setTitle] = useState();

    const [content, setContent] = useState();  //게시글 상세조회    
    const [reply, setReply] = useState();  //댓글작성내용
    const [modalInput, setModalInput] = useState("default");  
    const [tableData, setTableData] = useState(); //댓글 목록 조회 
    const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화
    
    
    const [modalCreateReply, setModalCreateReply] =useState(false);    
    const [modalDeleteReply, setModalDeleteReply] = useState(false);  

    
    const toggleCreateReply = () => setModalCreateReply(!modalCreateReply);
    const toggleDeleteReply = () => setModalDeleteReply(!modalDeleteReply);
    
    let replyArrays = [];  //댓글 목록 테이블
    function setReplyArrays(newArrays) {replyArrays = newArrays;}
    const renderInput = (replyArray, index) => {
        
        return (
            
            <tr key={index} >
                <Input type="hidden" value={replyArray.postId}></Input>
                <td>{replyArray.title}</td>
                <td>{replyArray.writerId}</td>
                <td>{replyArray.content}</td>                    
                <td className="text-nowrap">
                    <Button className={"createReplyButton"}  >{"댓글"}</Button> 
                    <Button className={"deleteReplyButton"}  >{"삭제"}</Button>
                </td>          
            </tr>
            
            //<td className="text-nowrap"><Button className={"deleteReplyButton"} color={"primary"} >{"수정"}</Button></td>  
        ) //<h1>props.activityHistoryCode : {activityHistoryCode}</h1>
    }//댓글 목록 조회시 보일것 (댓글작성자, 댓글내용, 댓글 작성날짜)
   
    const handlePostIdOnChange = (e) => {
        e.preventDefault();
        setPostId(e.target.value);
    }
    const handleReplyOnChange = (e) => {
        e.preventDefault();
        setReply(e.target.value);
    }
    const handleWriterIdOnChange = (e) => {
        e.preventDefault();
        setWriterId(e.target.value);
    }
    const handleWriteDateOnChange = (e) => {
        e.preventDefault();
        setWriteDate(e.target.value);
    }
    const handleTitleOnChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const toggleIsReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }

    const readPostInfo = () => { 
        var form = new FormData;
        form.append("postId", postId);
        axios.post('/community/readPostInfo',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            setWriterId(response.data.writerId);
            setWriteDate(response.data.writeDate);    
            setTitle(response.data.title);
            setContent(response.data.content);           
        })
    }
    function getReplyList(form) {
        var form = new FormData;
        
        form.append("postId", postId);
        axios.post('/community/readReply', form).then((response) => {
         
                setReplyArrays(response.data);
                setTableData(replyArrays.map(renderInput));
            });
    }  
    const updatePost = () => {
        var form = new FormData;
      
        form.append("postId", postId);
        form.append("title",title);
        form.append("content",content);       

        axios
            .post('/community/updatePost', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                window.location.reload();
            })
    }    
    const createReply = () =>{
        var form = new FormData;      
        form.append('userToken', localStorage.getItem("userToken"));
        form.append('postId', postId);
        form.append('reply',reply);
        axios.post("/community/createReply", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
        
            window.location.reload();
     
     })
    }

    const deletePost = () =>{
        var form = new FormData;      
       
        form.append('postId', postId);
       
        axios.post("/community/deletePost", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
        
            window.location.reload();
     
     })
    }
  
    $(function() { 

        
        $(".deleteReply").off("click")
            $(".deleteReplyButton").on("click",function(){
      
                var postButton = $(this);
    
                var tr = postButton.parent().parent();
                var td = tr.children();
                console.log("row데이터 : "+tr.eq(0).text());
                setModalInput(td.eq(0).val());
                toggleDeleteReply();
            }
            )
            
            $(".createReply").off("click")
            $(".createReplyButton").on("click",function(){
      
                var postButton = $(this);
    
                var tr = postButton.parent().parent();
                var td = tr.children();
                console.log("row데이터 : "+tr.eq(0).text());
                setModalInput(td.eq(0).val());
                toggleCreateReply();
            }
            )  
        }
        
    )
    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        readPostInfo();   //게시글 상세조회
        getReplyList(form); //댓글 목록조회
        },[]
    )
    return (
        <div className="container">        
            <Form>
                <FormGroup>
                    <InputGroup type="hidden">
                       
                        <Input type="textarea" name="postId" type="hidden" onChange={handlePostIdOnChange} value={postId} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>작성자ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="writerId" placeholder="작성자id" onChange={handleWriterIdOnChange} value={writerId} readOnly={true} ></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>작성날짜</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="writeDate" placeholder="작성날짜" onChange={handleWriteDateOnChange} value={writeDate} readOnly={true}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>제목</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="title" placeholder="제목" onChange={handleTitleOnChange} value={title} readOnly={isReadOnly}></Input>
                    </InputGroup>

                    <InputGroup >
                        <InputGroupAddon addonType="prepend"  >
                            <InputGroupText >내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" cols="50" rows="10" placeholder="내용" onChange={handleContentOnChange} value={content} readOnly={isReadOnly}></Input>
                    </InputGroup>          
                </FormGroup>
            </Form>

            <Button onClick={toggleIsReadOnly}>수정</Button>
            <Button type="hidden" color="primary" onClick={updatePost} >완료</Button>
            <Button color="primary" onClick={deletePost}  style={{float: 'right'}}>삭제</Button>
            
            <hr></hr>
 
            <Row>                
                {/*댓글 목록 테이블*/}
                <Col>
                    <Table>                    
                        <thead className="text-nowrap">                           
                            <tr>       
                                <th>댓글</th>             
                                <th>작성자</th>
                                <th>내용</th>                                                        
                            </tr>
                        </thead>
                        <tbody >                        
                            {tableData}                            
                        </tbody>
                    </Table>                    
                </Col>
            </Row>
            {/* <Modal isOpen={modalCreateReply}>
                        <ModalHeader toggle={toggleCreateReply}>댓글 등록</ModalHeader>
                       
                         <CreateReply postId={modalInput}></CreateReply>                         
            </Modal>
            <Modal isOpen={modalDeleteReply}>
                        <ModalHeader toggle={toggleDeleteReply}>댓글 삭제</ModalHeader>
                       
                         <DeleteReply postId={modalInput}></DeleteReply>                         
            </Modal> */}
            <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>댓글</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="댓글" onChange={handleReplyOnChange} value={reply}></Input>
            </InputGroup>                        
            <Button className="btn btn-primary btn-block w-25" color={"primary"} style={{float: 'right'}}   type="post" onClick={createReply}>{"댓글작성"}</Button>
            
            </div>            
    )
}
export default ReadCommunity;
