import React, {useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';

import './Menubar.css';
import logo from '../Image/houseLogo.png'
import logoutLogo from '../Image/logout.png'
import like from '../Image/like-toggle.png'
import list from '../Image/check.png'
import cancel from '../Image/cancel.png'


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
    const [userId, setUserID] = useState(" ")

    const likeHide = () => {
        var con = document.getElementById("check");
        if(con.style.display==='block'){
        con.style.display='none';
        }
      }
    
    const likeShow = () => {
        var con = document.getElementById("check");

        if(con.style.display==='none'){
          con.style.display='block';
        }else{
          con.style.display='block';
        }
    }
    const [dibs_list, setDibs] = useState();
    const dibs = (dib) => (
        <li><img id = "listImage" alt="" src={list}/>{dib.danjiName}</li>
    );

    function loadDibsData () {
        axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs/userid/${userId}`).then(({data}) => {
            data = data.dibs
            setDibs(data.map(dibs))
        })
    }

    return (
            <div menu-bar-wrap>
                <div className="menu-bar">
                    {loadDibsData()}
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
                            <div className = "user-container">
                                <div> {userId} 님 <img alt="likelist hide" src={like} id="likeImage" onClick={()=> likeShow()}/></div>
                                <div onClick = {() => {alert("안녕히 가세요!"); localStorage.clear(); setIsLogin(false); window.location.replace('/')}}>
                                    <img alt='logo' src={logoutLogo} className="logoutImage" />
                                </div>
                            </div>
                            : 
                            <div onClick = {() => {toggle(); setIsLogin(true)}}> LOGIN / JOIN </div>
                        }
                        </div>
                    </div>
                </div>

                <div id = "check">
                   <div id="like-wrap">찜 목록<img alt="" src={cancel} id="cancelImage" onClick={()=> likeHide()}/></div>
                    <div class="likeList">
                        <ul>
                            {dibs_list}
                        </ul>
                    </div>  
                </div>
                        
                <Modal isOpen={isOpen} toggle={toggle} >
                    <ModalBody>
                        <Login toggle={toggle} setUserID = {setUserID}/>
                    </ModalBody>
                </Modal>
            </div>
    );
}

export default Menubar;
