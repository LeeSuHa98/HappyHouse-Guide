import React, {useState} from 'react';
import { FormGroup, Input, Button,InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios'


const CreateCommunity = (props) => {
    
    
   
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
   
    
    const handlChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };    
    const handlChangeContent = (e) => {
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
            window.location.reload();
            props.toggle()
        }).catch(function (error){
            console.log(error)
            
        })
    }

    

    return (
        <div class ="create_container">       
           
                    <br/>
                    <FormGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>제목</InputGroupText>
                        </InputGroupAddon>
                        <Input type="title" name="title" id="title"  onChange={handlChangeTitle}/>
                    </InputGroup>
                    </FormGroup>
                    
                    <FormGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" id="content"  cols="50" rows="10" onChange={handlChangeContent}/>
                    </InputGroup>
                    
                    </FormGroup>
                    <div className="form-group">
                        <Button color="primary" block="block" onClick = {()=> handCommunity()}>등록</Button>
                    </div>

        </div>
    );
}

export default CreateCommunity;