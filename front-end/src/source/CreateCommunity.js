import React, {useState} from 'react';
import { FormGroup, Input, Button,InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap';
import classnames from 'classnames';
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
        var form={
            title : title,
            content : content
        };
        axios.post('https://localhost:8080/happyhouse/communities', form).then((res) => {
            if(res.data.token){
                alert("게시글 등록 완료!")
                localStorage.setItem("userToken", res.data.token)
                props.toggle()
            }
        }).catch(function (error){
            
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