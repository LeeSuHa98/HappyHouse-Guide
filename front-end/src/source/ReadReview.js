import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Progress,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import './Review.css'
import room1 from '../Image/room1.PNG'
import Moment from 'react-moment'
import numeral from 'numeral'
function ReadReview(props) {
    const [_id, set_id] = useState(props._id);
    const [userId, setUserId] = useState();
    const [title, setTitle] = useState()
    const [monthlyRentCharge, setMonthlyRentCharge] = useState()
    const [adminCharge, setAdminCharge] = useState()
    const [region, setRegion] = useState()
    const [typeName, setTypeName] = useState()
    const [merit, setMerit] = useState()
    const [demerit, setDemerit] = useState()
    const [picture, setPicture] = useState('')
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [star, setStar] = useState()
    const [writeDate, setWriteDate] = useState()

    const [modalInput, setModalInput] = useState("default");
    const [tableData, setTableData] = useState(); //댓글 목록 조회
    const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화
   
    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };
    const handleChangeMonthlyRentCharge = (e) => {
        e.preventDefault();
        setMonthlyRentCharge(e.target.value);
    };
    const handleChangeAdminCharge = (e) => {
        e.preventDefault();
        setAdminCharge(e.target.value);
    };
    const handleChangeRegion = (e) => {
        e.preventDefault();
        setRegion(e.target.value);
    };
    const handleChangeTypeName = (e) => {
        e.preventDefault();
        setTypeName(e.target.value);
    };
    const handlChangeMerit = (e) => {
        e.preventDefault();
        setMerit(e.target.value);
    };
    const handleChangeDemerit = (e) => {
        e.preventDefault();
        setDemerit(e.target.value);
    };
    const handleChangePicture = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e
            .target
            .files[0];
        reader.onloadend = () => {
            setPicture(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }
    const handlChangeStar = (e) => {
        e.preventDefault();
        setStar(e.target.value);
    };
   
    // const toggleIsReadOnly = () => {
    //     setIsReadOnly(!isReadOnly);
    // }

    const readReview = () => {

        var form = {
            _id: localStorage.getItem("review_id") //거주후기 id
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/detail', form)
            .then((res) => {

                console.log(res.data);
                setUserId(res.data.reviews.userId);
                setTitle(res.data.reviews.title);
                setMonthlyRentCharge(res.data.reviews.monthlyRentCharge);
                setAdminCharge(res.data.reviews.adminCharge);
                setRegion(res.data.reviews.region);
                setTypeName(res.data.reviews.typeName);
                setMerit(res.data.reviews.merit);
                setDemerit(res.data.reviews.demerit);
                setPicture(res.data.reviews.picture);
                setStar(res.data.reviews.star);
                setWriteDate(res.data.reviews.writeDate);
            })
            .catch(function (error) {
                console.log(error);
            })
        }

   
  
    useEffect(() => {
        readReview(); 
    }, [])

    const updateReview = () => {
       // let newDate = new Date();
       
        var form={
            houseId: "6063083edb67cc10cce15fc0",
            userId : localStorage.getItem("userID"),
            _id : localStorage.getItem("review_id"),
            title : title, 
            region : region,
            typeName : typeName,
            monthlyRentCharge : monthlyRentCharge,
            adminCharge : adminCharge,           
            merit : merit,
            demerit : demerit,
            picture : picture, 
            star : star,  
           // writeDate: newDate     
        };

        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/update', form).then((res) => {
            alert("거주후기 수정 완료")
            window.location.href ='/reviews'
        })
    }
    const deleteReview = () => {    
         var form={
             _id : localStorage.getItem("review_id"),
         };
 
         axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/delete', form).then((res) => {
             alert("거주후기 삭제 완료")
             window.location.href ='/reviews'
         })
     }
    return (
        <div>
            <React.Fragment>

                <div className="review-wrap">
                    <div className="review-title">
                        <div id="title">거주 후기</div>
                    </div>

                    
                    <div class="review-container">
                        <div class="review-block">
                            <div id="header">
                                <h4>
                                            <Input
                                                name="title"
                                                onChange={handleChangeTitle}
                                                value={title}
                                            ></Input>
                                        </h4>
                            </div>
                          
                            <div id="writer-writeDate-star">
                                <div>{userId}
                                    /
                                    <Moment format="YY.MM.DD">{writeDate}</Moment>
                                        <Progress  value={star} max="5" />평점(0~5)</div><Input placeholder="평점(0~5)" name="star" onChange={handlChangeStar} value={star}></Input>
                                    
                            </div>

                            <div>
                                <table class="houseInfo">
                                    <tr>
                                        <td id="a">지역</td>
                                        <td id="a">
                                            <Input
                                                name="content"
                                                onChange={handleChangeRegion}
                                                value={region}
                                            ></Input>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td id="a">임대종류</td>
                                        <td>
                                            <Input value="행복주택" readOnly={isReadOnly}></Input>
                                        </td>
                                        <td id="a">유형</td>
                                        <td>
                                            <Input value="아파트" readOnly={isReadOnly}></Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="a">주택형</td>
                                        <td id="a">
                                            <Input
                                                name="content"
                                                onChange={handleChangeTypeName}
                                                value={typeName}
                                            ></Input>
                                        </td>

                                        <td id="a">공급수</td>
                                        <td>
                                            <Input value="32 세대" readOnly={isReadOnly}></Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="a">월세</td>
                                        <td id="a">
                                            <Input
                                                name="monthlyRentCharge"
                                                onChange={handleChangeMonthlyRentCharge}
                                                value={numeral(monthlyRentCharge).format('0,0')}
                                            ></Input>
                                        </td>

                                        <td id="a">관리비</td>
                                        <td id="a">
                                            <Input
                                                name="adminCharge"
                                                onChange={handleChangeAdminCharge}
                                                value={numeral(adminCharge).format('0,0')}
                                            ></Input>
                                        </td>

                                    </tr>
                                </table>
                            </div>

                            <div class="review-image">
                                <img src={room1} id="reviewImage"></img>
                                {/* <div>{reviews.picture}</div> */}
                            </div>

                            <div class="review-content">
                                <div id="merit">
                                    <div id="b">장점</div>
                                    <Input
                                        name="merit"
                                        cols="50"
                                        rows="20"
                                        onChange={handlChangeMerit}
                                        value={merit}
                                        ></Input>

                                </div>
                                <div id="demerit">
                                    <div id="b">단점</div>
                                    <Input
                                        className="input-style"
                                        name="demerit"
                                        cols="50"
                                        rows="20"                                    
                                        onChange={handleChangeDemerit}
                                        value={demerit}
                                        ></Input>
                                </div>
                            </div>
                            <br></br>
                            <div className="button-container">
        <button id="review-upload" onClick={updateReview}>수정</button>
        <button id="review-upload" onClick={deleteReview}>삭제</button>
        <button id="review-upload" onClick = {()=>{window.location.href ='/reviews'}} style={{float: 'left'}}>취소</button>
        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>

    )
}
export default ReadReview;
