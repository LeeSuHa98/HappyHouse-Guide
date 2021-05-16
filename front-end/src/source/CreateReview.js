import React, {useState} from 'react';
import {
    FormGroup,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Progress,
    InputGroupText,
    CustomInput
} from 'reactstrap';
import axios from 'axios'
import {Image} from 'react-bootstrap';
import numeral from 'numeral'
import room1 from '../Image/room1.PNG'
import Moment from 'react-moment'

const CreateReview = (props) => {
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
    const [star, setStar] = useState()
    const [writeDate, setWriteDate] = useState()
    const [isReadOnly, setIsReadOnly] = useState(true); // 수정활성화
    const [file, setFile] = useState()
    const [filename,setFilename] = useState()


    //
    const [img,setImage] = useState(null);


    let $imagePreview = null;

    const handlChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };
    const handlChangeRegion = (e) => {
        e.preventDefault();
        setRegion(e.target.value);
    };
    const handlChangeTypeName = (e) => {
        e.preventDefault();
        setTypeName(e.target.value);
    };
    const handlChangeMonthlyRentCharge = (e) => {
        e.preventDefault();
        setMonthlyRentCharge(e.target.value);
    };
    const handlChangeAdminCharge = (e) => {
        e.preventDefault();
        setAdminCharge(e.target.value);
    };
    const handlChangeMerit = (e) => {
        e.preventDefault();
        setMerit(e.target.value);
    };
    const handlChangeDemerit = (e) => {
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
    const handlChangeStar = (e) => {
        e.preventDefault();
        setStar(e.target.value);
    };
    const createReview = () => {
         let newDate = new Date();
        
         var form={
             houseId: "6063083edb67cc10cce15fc0",
             userId : localStorage.getItem("userID"),
             title : title, 
             region : region,
             typeName : typeName,
             monthlyRentCharge : monthlyRentCharge,
             adminCharge : adminCharge,           
             merit : merit,
             demerit : demerit,
             file : file, 
             star : star,  
             writeDate: newDate     
         };
        console.log('insert : ',form);
        //alert("  거주후기 작성 완료1"+file)
        //  axios.post('/happyhouse/reviews', form).then((res) => {
        //      alert("거주후기 작성 완료")
        //      window.location.href ='/reviews'
        //  })
        axios.post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews', form
        ,{headers: {'content-type':'multipart/form-data'}}
        ).then((res) => {
            alert("거주후기 작성 완료")
           // window.location.href ='/reviews'
        })
     }
    
     //TEST
     const onChange = (e) => {
        setFile(e.target.files[0]);
      }
    
      const create = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
      }
    //TEST

    return (
    // <div className="dv">

    //     <React.Fragment>

    //         <div className="review-wrap">
    //             <div className="review-title">
    //                 <div id="title">거주 후기 작성</div>
    //             </div>

    //             <br></br>
    //             <div>
    //                 <div class="review-block">
    //                     <div id="header">
    //                         <h4>제목
    //                             <Input name="title" onChange={handlChangeTitle} value={title}></Input>
    //                         </h4>
    //                     </div>

    //                     <div id="writer-writeDate-star">
    //                         <div>

    //                             <Progress value={star} max="5"/>평점(0~5)</div>
    //                         <Input
    //                             placeholder="평점(0~5)"
    //                             name="star"
    //                             onChange={handlChangeStar}
    //                             value={star}></Input>

    //                     </div>

    //                     <div>
    //                         <table class="houseInfo">
    //                             <tr>
    //                                 <td id="a">지역</td>
    //                                 <td id="a">
    //                                     <Input name="content" onChange={handlChangeRegion} value={region}></Input>
    //                                 </td>
    //                                 <td id="a">작성자ID</td>
    //                                 <td id="a">
    //                                     <Input
    //                                         name="userId"
    //                                         value={localStorage.getItem("userID")}
    //                                         readOnly={isReadOnly}></Input>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td id="a">임대종류</td>
    //                                 <td>
    //                                     <Input value="행복주택" readOnly={isReadOnly}></Input>
    //                                 </td>
    //                                 <td id="a">유형</td>
    //                                 <td>
    //                                     <Input value="아파트" readOnly={isReadOnly}></Input>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td id="a">주택형</td>
    //                                 <td id="a">
    //                                     <Input name="content" onChange={handlChangeTypeName} value={typeName}></Input>
    //                                 </td>

    //                                 <td id="a">공급수</td>
    //                                 <td>
    //                                     <Input value="32 세대" readOnly={isReadOnly}></Input>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td id="a">월세</td>
    //                                 <td id="a">
    //                                     <Input
    //                                         name="monthlyRentCharge"
    //                                         onChange={handlChangeMonthlyRentCharge}
    //                                         value={numeral(monthlyRentCharge).format('0,0')}></Input>
    //                                 </td>

    //                                 <td id="a">관리비</td>
    //                                 <td id="a">
    //                                     <Input
    //                                         name="adminCharge"
    //                                         onChange={handlChangeAdminCharge}
    //                                         value={numeral(adminCharge).format('0,0')}></Input>
    //                                 </td>

    //                             </tr>
    //                         </table>
    //                     </div>

                      
    //                         <div class="review-content">
    //                             <div id="merit">
    //                                 <div id="b">장점</div>
    //                                 <Input
    //                                     name="merit"
    //                                     cols="50"
    //                                     rows="20"
    //                                     onChange={handlChangeMerit}
    //                                     value={merit}></Input>

    //                             </div>
    //                             <div id="demerit">
    //                                 <div id="b">단점</div>
    //                                 <Input
    //                                     className="input-style"
    //                                     name="demerit"
    //                                     cols="50"
    //                                     rows="20"
    //                                     onChange={handlChangeDemerit}
    //                                     value={demerit}></Input>
    //                             </div>
    //                             <br></br>
    //                             <div class="review-image">
    //                                 <InputGroup>
    //                                     <InputGroupAddon addonType="prepend">
    //                                         <InputGroupText>사진첨부</InputGroupText>
    //                                     </InputGroupAddon>
    //                                     <CustomInput
    //                                         type="file"
    //                                         name="file"
    //                                         file={file}
    //                                         value={filename}
    //                                         accept='image/jpg,impge/png,image/jpeg,image/gif'                                            
    //                                         label="파일 선택"
    //                                         onChange={handleChangeFile}>asdf</CustomInput>
    //                                 </InputGroup>
    //                                 {!$imagePreview && <Image src={imagePreviewUrl} className="mw-100"></Image>}
    //                             </div>
    //                         </div>
    //                         <br></br>
    //                         <div className="button-container">
    //                             <button id="review-upload" onClick={createReview}>작성</button>
    //                             <button
    //                                 id="review-upload"
    //                                 onClick ={()=>{window.location.href ='/reviews'}}
    //                                 style={{
    //                                     float: 'left'
    //                                 }}>취소</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </React.Fragment>
    //     </div>
    
<div class="dv"> 
<div class="review-image">
    
<br></br>
<br></br>
<br></br>
                                   <InputGroup>
                                         <InputGroupAddon addonType="prepend">
                                             <InputGroupText>사진첨부</InputGroupText>
                                         </InputGroupAddon>
                                         <CustomInput
                                             type="file"
                                             name="myImage"
                                             file={file}
                                             value={filename}
                                             accept='image/jpg,impge/png,image/jpeg,image/gif'                                            
                                             label="파일 선택"
                                             onChange={onChange}></CustomInput>
                                    </InputGroup>
                                    <button id="review-upload" onClick={create}>작성</button>
</div>

    </div>
    

        );
}

export default CreateReview;