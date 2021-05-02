import React, {useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import './Menubar.css';
import logo from '../Image/houseLogo.png'

import{
    Modal,
    ModalBody
} from 'reactstrap';
import Login from'./Login'
import Communities from './communities'
import Reviews from './reviews'


const Header = ({match, history}) => {
    
    useEffect(() => {
        if(!localStorage.getItem("userToken")){
            localStorage.setItem("userToken", "bearer: ");
        }
    });
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className = "header">
            <div menu-bar-wrap>
                <div className="menu-bar">
                    <div className="logo">
                        <img alt='logo' src={logo} className="logoImage" />
                        <a href = "/">Home/test</a>
                    </div>

                    <div className="menuGroup">
                        <div className="reviewButton">
                        <a href = "/reviews" className="reviewButton">REVIEW</a>
                        </div>
                        <div className="communityButton">
                        <a href = "/communities" className="reviewButton">COMMUNITY</a>
                        </div>
                        <div className="loginButton">
                        {
                            localStorage.getItem("userToken") === "bearer: " ?
                            <div onClick = {() => toggle()}> LOGIN / JOIN </div>
                            : 
                            <div onClick = {() => {localStorage.setItem("userToken", "bearer: "); }}> LOGOUT </div>
                        }
                        </div>
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

export default Header;
