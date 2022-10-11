import React, {useEffect, useState} from 'react';
import {
    Input,
} from 'reactstrap';
import axios from 'axios';
import './css/community.css'

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
const updateCommunity = () => {

    var form = {
        userId: localStorage.getItem("userID"),
        _id: localStorage.getItem("community_id"),
        title: title,
        content: content,
    };
    
    console.log('수정커뮤니티', form);
    
    axios
    .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities/update', form).then((res) => {
       
        alert("게시글 수정 완료")
        window.location.href ='/communities'
    })
}

    useEffect(() => {
        readCommunity(); 
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
                    <div id="b"></div>
        <Input
           type="textarea"
            className="input-style"
            name="content" id="content"
            cols="50" rows="10"
            onChange={handleChangeContent}
                            value={content}
           ></Input>
                    <br></br>
                   <div className="button-container">
                <button id="review-upload" onClick={updateCommunity}>수정</button>
                  <button id="review-upload" onClick = {()=>{window.location.href ='/communities'}} style={{float: 'left'}}>취소</button>
                </div> 
                    
                    <br></br>
                 </div> 
        </div>

    )
}
export default ReadCommunity;
