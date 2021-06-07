import React, {useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Input, Button, Form, InputGroup} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios'
import LoginKakao from './KakaoLogin';
import GoogleLogin from './GoogleLogin';
import './css/Menubar.css';
import './css/Login.css';

const Login = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    
    const [id, setId] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [phoneNum, setPhoneNum] = useState()
    
    const handlChangeId = (e) => {
        e.preventDefault();
        setId(e.target.value);
    };

    
    const handlChangePw = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    
    const handlChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    
    const handlChangePhonNum = (e) => {
        e.preventDefault();
        setPhoneNum(e.target.value);
    };


    

    const handLogin = () => {
        var form={
            userID : id,
            password : password
        };
        axios.post('/happyhouse/login', form).then((res) => {
            if(res.data.token){
                alert("환영합니다!")
                localStorage.setItem("userToken", res.data.token)
                localStorage.setItem("userID", res.data.userID)
                localStorage.setItem("userName", res.data.name)
                props.toggle()
            }
        }).catch(function (error){
            alert("등록된 회원이 아닙니다")
        })
    }

    const handJoin = () => {
        var form={
            userID : id.toString(),
            password : password.toString(),
            name : name.toString(),
            phoneNum : phoneNum.toString()
        };
        axios.post('/happyhouse/users', form).then((res) => {
            if(res.data.userID){
                alert("회원가입 성공")
                props.toggle()
            }
        }).catch(function (error){
            alert("잘못된 입력 값입니다.")
        })
    }

    return (
        <div class ="login_container">
             <Nav tabs >
                <NavItem id = "tab">
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        로그인
                    </NavLink>
                </NavItem>

                <NavItem id = "tab">
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        회원가입
                    </NavLink>
                </NavItem>
            </Nav>


            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                    <br/>
                    <FormGroup>
                        <Input type="userId" name="userId" id="userId" placeholder="아이디" onChange={handlChangeId}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="examplePassword" placeholder="비밀번호" onChange={handlChangePw}/>
                    </FormGroup>
                    <div className="form-group">
                        <Button color="primary" block="block" onClick = {()=> handLogin()}>로그인</Button>
                    </div>
                    <div className="form-group">
                        <div>
                            <LoginKakao toggle = {props.toggle}/>
                            <GoogleLogin toggle = {props.toggle}/>
                        </div>
                    </div>
                </TabPane>


                <TabPane tabId="2">
                <Form>
                    <br/>
                    <div className="form-group">
                        <InputGroup>
                            <Input
                                type="text"
                                name="userId"
                                placeholder="아이디"
                                onChange={handlChangeId}
                                className="form-control"></Input>
                        </InputGroup>
                    </div>

                    <div className="form-group">
                        <InputGroup>
                            <Input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                onChange={handlChangePw}
                                className="form-control"></Input>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <InputGroup>
                            <Input
                                type="text"
                                name="name"
                                placeholder="이름"
                                onChange={handlChangeName}
                                className="form-control"></Input>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <InputGroup>
                            <Input
                                type="text"
                                name="phoneNum"
                                placeholder="휴대폰번호"
                                onChange={handlChangePhonNum}
                                className="form-control"></Input>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <Button
                            color="primary"
                            variant="primary"
                            onClick={()=>handJoin()}
                            block="block">회원가입
                        </Button>
                    </div>
                    </Form>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Login;