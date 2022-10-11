import React, {useState} from 'react';
import {Input} from 'reactstrap';
import axios from 'axios'


const CreateCommunity = (props) => {
    

    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };    
    const handleChangeContent = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };
    

    const handCommunity = () => {
        let newDate = new Date();
        var form={
            title : title,
            content : content,
            userId : localStorage.getItem("userID"),
            groupId : 0,
            replyOrder: 0,
            replyStep: 0,
            writeDate: newDate,
            numberOfView: 0
        };
        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities', form).then((res) => {
            alert("게시글이 작성 완료")
            localStorage.setItem("page",1);
            window.location.reload();
            props.toggle()
        }).catch(function (error){
            console.log(error)
            
        })
    }

    

    return (
        <div class ="create_container">       
           
                    <br/>
                    
                    <div id="b"></div>
        <Input
            className="input-style"
            name="title"
            placeholder="글제목"
            type="title" name="title" id="title"
            onChange={handleChangeTitle}
            ></Input>
      <div id="b"></div>
        <Input
           type="textarea"
            className="input-style"
            name="content" id="content"
            cols="50" rows="10"
            onChange={handleChangeContent}
           ></Input>
         <br></br>
                    <div className="form-group">
                        <button class="community-submit"  block="block" onClick = {()=> handCommunity()}>작성</button>
                    </div>

        </div>
    );
}

export default CreateCommunity;