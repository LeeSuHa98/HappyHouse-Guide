import React, {useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import './Menubar.css';
import logo from '../Image/houseLogo.png'

import{
    Modal,
    ModalBody
} from 'reactstrap';
import Login from'./Login'


const Menubar = (props) => {
    
    useEffect(() => {
        if(!localStorage.getItem("userToken")){
            localStorage.setItem("userToken", "bearer: ");
        }
        
        if(localStorage.getItem("userToken") === "bearer: "){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }
    });
    
    const [isLogin, setIsLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
            <div menu-bar-wrap>
                <div className="menu-bar">
                    <div className="logo" onClick = {()=>{window.location.href ='/'}}>
                        <img alt='logo' src={logo} className="logoImage" />
                    </div>

                    <div className="menuGroup">
                        <div className="reviewButton" onClick = {()=>{window.location.href ='/reviews'}}>
                            REVIEW
                        </div>
                        <div className="communityButton" onClick = {()=>{window.location.href ='/communities'}}>
                            COMMUNITY
                        </div>
                        <div className="loginButton">
                        {
                            isLogin === true?
                            <div onClick = {() => {alert("안녕히 가세요!"); localStorage.removeItem("userToken"); setIsLogin(false); window.location.replace('/')}}> LOGOUT </div>
                            : 
                            <div onClick = {() => {toggle(); setIsLogin(true)}}> LOGIN / JOIN </div>
                        }
                        </div>
                    </div>
                </div>
                        
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalBody>
                        <Login toggle={toggle}/>
                    </ModalBody>
                </Modal>
            </div>
    );
}

export default Menubar;
