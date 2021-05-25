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
    CustomInput,
    Progress,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import './css/Review.css'
import {Image} from 'react-bootstrap';
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
    const [picture, setPicture] = useState()
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [star, setStar] = useState(5)
    const [writeDate, setWriteDate] = useState()
    const [file, setFile] = useState()
    const [filename,setFilename] = useState()
    const [img,setImage] = useState(null);

    const [modalInput, setModalInput] = useState("default");
    const [tableData, setTableData] = useState(); //댓글 목록 조회
    const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화
    let $imagePreview = null;
    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };
    const handleChangeRegion = (e) => {
        e.preventDefault();
        setRegion(e.target.value);
    };
    const handleChangeTypeName = (e) => {
        e.preventDefault();
        setTypeName(e.target.value);
    };
    const handleChangeMonthlyRentCharge = (e) => {
        e.preventDefault();
        setMonthlyRentCharge(e.target.value);
    };
    const handleChangeAdminCharge = (e) => {
        e.preventDefault();
        setAdminCharge(e.target.value);
    };
    const handleChangeMerit = (e) => {
        e.preventDefault();
        setMerit(e.target.value);
    };
    const handleChangeDemerit = (e) => {
        e.preventDefault();
        setDemerit(e.target.value);
    };
    const handleChangeFile = (e) => {
        e.preventDefault();
        setFilename(e.target.value);
         let reader = new FileReader();
         let file = e
             .target
             .files[0];
         reader.onloadend = () => {
             setFile(file);
             setImagePreviewUrl(reader.result);
         }
         reader.readAsDataURL(file);
    }
    const handleChangeStar = (e) => {
        e.preventDefault();
        setStar(e.target.value);
    };
   
    // const toggleIsReadOnly = () => {
    //     setIsReadOnly(!isReadOnly);
    // }
    const onChange = (e) => {
        let reader = new FileReader();
        let file = e
            .target
            .files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
        setFile(e.target.files[0]);
      }
    const readReview = () => {

        var form = {
            _id: localStorage.getItem("review_id") //거주후기 id
        };
        axios
            .post('/happyhouse/reviews/detail', form)
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

       const formData = new FormData();
       formData.append('houseId', "6063083edb67cc10cce15fc0");
       formData.append('userId', localStorage.getItem("userID"));
       formData.append('_id', localStorage.getItem("review_id"));
       formData.append('title', title);
       formData.append('region', region);
       formData.append('typeName', typeName);
       formData.append('monthlyRentCharge', monthlyRentCharge);
       formData.append('adminCharge', adminCharge);
       formData.append('merit', merit);
       formData.append('demerit', demerit);
       formData.append('star', star);
       formData.append('myImage', file);
       const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
       };
       axios.post('/happyhouse/reviews/update',formData,config)
            .then((response) => {
                alert("거주후기 수정 완료");
                window.location.href ='/reviews'
            }).catch((error) => {
        });

    }
    const deleteReview = () => {    
         var form={
             _id : localStorage.getItem("review_id"),
         };
 
         axios.post('/happyhouse/reviews/delete', form).then((res) => {
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

                        <div class="write-modal-info">
<div class="review-item-title">
<a class="danji" target="_blank" href="/building/3db0dda56e3?title=봉천동 964-25">
봉천동 964-25
</a>
<p class="address">
서울특별시 관악구 봉천동 964-25
</p>
<span class="badge">행복주택</span>
<span class="badge">아파트</span>
</div>
</div>


<p class="p">
<span>리뷰 작성 시 주의해주세요</span><br/>1. 단순 비방 및 욕설이 아니라, 객관적
사실에 근거한 리뷰를 작성해주세요.<br/>
*객관적 사실에 근거해서 리뷰를 작성하신 경우에는 공익성을 고려하여 명예훼손에 해당되지 않는다는 대법원
판례(2012도10392)가 있습니다. <br/>
2. 실제로 거주했던 집에만 후기를 남겨주세요.<br/>
위 가이드라인을 지키지 않은 리뷰는 관리자에 의해 삭제될 수 있습니다.
</p>


<div id="create-review-item">월세</div>
    <tr>

        <td id="a">
            <Input
                name="monthlyRentCharge"
                onChange={handleChangeMonthlyRentCharge}
                value={numeral(monthlyRentCharge).format('0,0')}></Input>
        </td>
    </tr>
    <div id="create-review-item">관리비</div>
    <tr>

        <td id="a">
            <Input
                name="adminCharge"
                onChange={handleChangeAdminCharge}
                value={numeral(adminCharge).format('0,0')}></Input>
        </td>
    </tr>
    <div id="merit">
        <div id="b">거주후기 제목</div>
        <Input
            name="title"
            cols="50"
            rows="20"
            onChange={handleChangeTitle}
            value={title}></Input>

    </div>
    <div id="merit">
        <div id="b">장점</div>
        <Input
            name="merit"
            cols="50"
            rows="20"
            onChange={handleChangeMerit}
            value={merit}></Input>

    </div>
    <div id="demerit">
        <div id="b">단점</div>
        <Input
            className="input-style"
            name="demerit"
            cols="50"
            rows="20"
            onChange={handleChangeDemerit}
            value={demerit}></Input>
    </div>
    <div id="create-review-item">평점</div>
    <tr>

        <td >
        <fieldset class="rating">
  <input  onChange={handleChangeStar} type="radio" id="star5" name="rating" value="5.0" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star4half" name="rating" value="4.5" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star4" name="rating" value="4.0" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star3half" name="rating" value="3.5" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star3" name="rating" value="3.0" /><label class="full" for="star3" title="Meh - 3 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star2half" name="rating" value="2.5" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star1half" name="rating" value="1.5" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
  <input  onChange={handleChangeStar} type="radio" id="star1" name="rating" value="1.0" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
  <input  onChange={handleChangeStar} type="radio" id="starhalf" name="rating" value="0.5" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
        </td>
    </tr>
    
    <br></br>
    <div>
        <InputGroup>
           
            <CustomInput
                type="file"
                name="myImage"
                file={file}
                value={filename}
                accept='image/jpg,impge/png,image/jpeg,image/gif'
                label="사진 선택"
                onChange={onChange}></CustomInput>
        </InputGroup>

        <br></br>
        {!$imagePreview &&
        <Image src={imagePreviewUrl} className="mw-100"></Image>}
    </div>













                            {/* <div id="header">
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
                                {/* <div>{reviews.picture}</div>
                            </div> */}

                            {/* <div class="review-content">
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
                            </div> */}
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
