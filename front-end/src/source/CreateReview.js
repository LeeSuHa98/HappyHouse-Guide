import React, {useState} from 'react';
import { FormGroup, Input, Button,InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios'


const CreateReview = (props) => {
    

   
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
        axios.post('http://localhost:8080/happyhouse/reviews', form).then((res) => {
           console.log(res.data);
        }).catch(function (error){
            alert("잘못된 입력 값입니다.")
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

export default CreateReview;