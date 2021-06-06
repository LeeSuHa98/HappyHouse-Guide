import React, {useEffect, useState} from 'react';
import {
    Input,
    InputGroup,
    CustomInput
} from 'reactstrap';
import axios from 'axios'
import './css/Review.css'
import {Image} from 'react-bootstrap';
import numeral from 'numeral'

const CreateReview = (props) => {
    const [_id, set_id] = useState(props._id);
    const [userId, setUserId] = useState();
    const [title, setTitle] = useState()
    const [monthlyRentCharge, setMonthlyRentCharge] = useState()
    const [adminCharge, setAdminCharge] = useState()
    const [region, setRegion] = useState()
    const [typeName, setTypeName] = useState("전체")
    const [merit, setMerit] = useState()
    const [demerit, setDemerit] = useState()
    const [picture, setPicture] = useState()
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [star, setStar] = useState(5)
    const [file, setFile] = useState(0)
    const [filename,setFilename] = useState()

    const [address,setAddress] = useState()
    const [danjiName,setDanjiName] = useState()
    const [houseType,setHouseType] = useState()
    const [sidoName,setSidoName] = useState()

    const [typeName_List, setTypeNameList] = useState();  //TYPENAME


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
    const handlChangeStar = (e) => {
        e.preventDefault();
        setStar(e.target.value);
    };
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
    
      const create = (e) => {
        e.preventDefault();
        let newDate = new Date();        
       
        if(file !=0){
            const formData = new FormData();
            formData.append('danjiCode', localStorage.getItem("danjiCode"));
            formData.append('danjiName', danjiName);
            formData.append('userId', localStorage.getItem("userID"));
            formData.append('title', title);
            formData.append('region', sidoName);    //주택정보
            formData.append('typeName', typeName); 
            formData.append('houseType', houseType); //주택정보
            formData.append('monthlyRentCharge', monthlyRentCharge);
            formData.append('adminCharge', adminCharge);
            formData.append('merit', merit);
            formData.append('demerit', demerit);
            formData.append('star', star);
            formData.append('writeDate', newDate);
            formData.append('myImage', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            axios.post("https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews",formData,config)
            .then((response) => {
                alert("거주후기 등록 완료");
                window.location.href ='/reviews'
            }).catch((error) => {
        });
        }else{
            var form={
                danjiCode: localStorage.getItem("danjiCode"),
                danjiName : danjiName,
                userId : localStorage.getItem("userID"),
                title : title,
                region: sidoName,
                typeName: typeName,
                houseType: houseType,
                monthlyRentCharge: monthlyRentCharge,
                adminCharge: adminCharge,
                merit: merit,
                demerit: demerit,
                star: star,
                writeDate: newDate
            };

            axios.post("https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews/create",form)
            .then((res) => {
                alert("거주후기 등록 완료");
                window.location.href ='/reviews'
            }).catch((error) => {
        });
        }
        
      }
    const readHouse = (e) => {   //주택정보 
        var form = {
            danjiCode: localStorage.getItem("danjiCode") //단지code
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseInfos/detail', form)
            .then((res) => {

                console.log(res.data);
                setAddress(res.data.houseInfo.address);
                setHouseType(res.data.houseInfo.houseType);
                setDanjiName(res.data.houseInfo.danjiName);
                setSidoName(res.data.houseInfo.sidoName);

            })
            .catch(function (error) {
                console.log(error);
            })
      }

      const readTypeNameList = () => { 

        var form = {
            danjiCode: localStorage.getItem("danjiCode")
        };
        axios
            .post('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseInfos/type', form)
            .then(({data}) => {
               data = data.houseInfoList
                setTypeNameList(data.map(typeNameList))
    
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        const typeNameList = (houseInfo) => (

            
     <option>{ houseInfo.typeName }</option>
               
           
        );


      useEffect(() => {
        readHouse(); 
        readTypeNameList();
    }, [])
    return (
    <div className="dv">

        <React.Fragment>

            <div className="review-wrap">
                <div className="review-title">
                    <div id="title">거주 후기 작성</div>
                </div>
                <br></br>
                <div>
                    <div class="review-block">
<div class="write-modal-info">
<div class="review-item-title">
<a class="danji" target="_blank" href="/building/3db0dda56e3?title=봉천동 964-25">
{danjiName}
</a>
<p class="address">
{address}
</p>
<span class="badge">행복주택</span>
<span class="badge">{houseType}</span>
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

                   <div class="review-content">

                

    <div id="create-review-item">월세</div>
    <tr>

        <td id="a">
            <Input
                name="monthlyRentCharge"
                onChange={handlChangeMonthlyRentCharge}
                value={numeral(monthlyRentCharge).format('0,0')}></Input>
        </td>
    </tr>
    <div id="create-review-item">관리비</div>
    <tr>

        <td id="a">
            <Input
                name="adminCharge"
                onChange={handlChangeAdminCharge}
                value={numeral(adminCharge).format('0,0')}></Input>
        </td>
    </tr>
    <div id="merit">
        <div id="b">주택형</div>
        <select id = "review-search-typeName"  onChange={handlChangeTypeName}>
        <option>전체</option>
                        {typeName_List}
                    </select>

    </div>
    <div id="merit">
        <div id="b">거주후기 제목</div>
        <Input
            name="title"
            cols="50"
            rows="20"
            onChange={handlChangeTitle}
            value={title}></Input>

    </div>
    
    <div id="merit">
        <div id="b">장점</div>
        <Input
            name="merit"
            cols="50"
            rows="20"
            onChange={handlChangeMerit}
            value={merit}></Input>

    </div>
    <div id="demerit">
        <div id="b">단점</div>
        <Input
            className="input-style"
            name="demerit"
            cols="50"
            rows="20"
            onChange={handlChangeDemerit}
            value={demerit}></Input>
    </div>
    <div id="create-review-item">평점</div>
    <tr>

        <td >
        <fieldset class="rating">
  <input  onChange={handlChangeStar} type="radio" id="star5" name="rating" value="5.0" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star4half" name="rating" value="4.5" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star4" name="rating" value="4.0" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star3half" name="rating" value="3.5" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star3" name="rating" value="3.0" /><label class="full" for="star3" title="Meh - 3 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star2half" name="rating" value="2.5" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star1half" name="rating" value="1.5" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
  <input  onChange={handlChangeStar} type="radio" id="star1" name="rating" value="1.0" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
  <input  onChange={handlChangeStar} type="radio" id="starhalf" name="rating" value="0.5" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
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
    <br></br>
    <button class="review-submit" onClick={create}>작성</button>
    </div>
                            <br></br>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    

    

        );
}

export default CreateReview;