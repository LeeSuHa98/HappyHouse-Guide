import React, {useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';

import { Spinner } from 'reactstrap';

import './css/Menubar.css';
import logo from '../Image/home.png'
import logoutLogo from '../Image/logout.png'
import notify from '../Image/bell.png'
import list from '../Image/check.png'
import cancel from '../Image/cancel.png'


import{
    Modal,
    ModalBody
} from 'reactstrap';
import Login from'./Login'


const Menubar = (props) => {
    const [dibs_list, setDibs] = useState();
    
    const [isLoading, setIsLoading] = useState(true)
    const [isLogin, setIsLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

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

    
    const dibs = (dib) => (
        <li><img id = "listImage" alt="" src={list}/>{dib.danjiName}</li>
    );

    const loadDibsData = () => {
        setIsLoading(true)
        var userId = localStorage.getItem("userID")
        axios.get(`https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/dibs/userid/${userId}`).then(({data}) => {
            data = data.dibs
            setDibs(data.map(dibs))
            setIsLoading(false)
        })
    }
    
    return (
        <div class="top-header">
        <div class="wrap">
            {/* <div class="top-header-left" onClick = {()=>{window.location.href ='/'}} > */}
            {/* </div> */}
            <div class="top-header-right">
                <ul>
                <li id="hoverTest"><a onClick = {()=>{window.location.href ='/'}}>Home<span> </span></a></li>
                    <li id="hoverTest"><a onClick = {()=>{window.location.href ='/reviews'}}>Review<span> </span></a></li>
                    <li id="hoverTest"><a onClick = {()=>{window.location.href ='/communities'}}>Community</a><span> </span></li>
                    <li id="hoverTest"> {
                        isLogin === true?
                        <div className = "user-container">
                            <div> {localStorage.getItem("userName")} 님</div>
                            <div><img alt="likelist hide" src={notify} id="likeImage" onClick={()=> {likeShow();loadDibsData();}}/></div>
                            <div onClick = {() => {alert("안녕히 가세요!"); localStorage.clear(); setIsLogin(false); window.location.replace('/')}}>
                                <img alt='logo' src={logoutLogo} className="logoutImage" />
                            </div>
                        </div>
                        : 
                        <div onClick = {() => {toggle(); setIsLogin(true)}}> Login | Join </div>
                    }</li>

                </ul>
            </div>
            <div class="clear"> </div>
        </div>


                <div id = "check">
                   <div id="like-wrap">찜 목록<img alt="" src={cancel} id="cancelImage" onClick={()=> likeHide()}/></div>
                    {
                    isLoading ?
                        <div>
                            <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
                        </div>
                    :

                        <div class="likeList">
                            <ul>
                                {dibs_list}
                            </ul>
                        </div>  
                    }
                </div>
                        
                <Modal isOpen={isOpen} toggle={toggle} >
                    <ModalBody>
                        <Login toggle={toggle}/>
                    </ModalBody>
                </Modal>
            </div>
    );
}

export default Menubar;
