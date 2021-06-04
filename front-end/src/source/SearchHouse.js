import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { FormGroup, Input, Button,InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios'


const SearchHouse = (props) => {
    const [options, setData] = useState([])
    const [choice, setChoice] = useState(); 
    useEffect(() => {
        loadAsyncData();
      }, [])
  
   
    const loadAsyncData = () => {
        let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseinfos/address`;

        axios.get(url).then(({data}) => {
            data = data.houseInfoList
            
            setData(data.map(houseInfoList => ({value: houseInfoList.danjiName, label: houseInfoList.danjiName, state: {lat:houseInfoList.lat, lng:houseInfoList.lng}, code: houseInfoList.danjiCode})))
        })
    }
  

  const onChange = (code) => {
console.log(code);

  }


  const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid lightgray',
        color: 'rgb(51, 51, 51)',
        padding: 20,
        ":hover": {
          // Overwrittes the different states of border
          backgroundColor: 'lightgray',
        },
        fontFamily: 'Do Hyeon',
      }),
    }

    

    return (
        <div >       
           <p class="p">
<span>리뷰 작성 시 주의해주세요</span><br/>1. 단순 비방 및 욕설이 아니라, 객관적
사실에 근거한 리뷰를 작성해주세요.<br/>
*객관적 사실에 근거해서 리뷰를 작성하신 경우에는 공익성을 고려하여 명예훼손에 해당되지 않는다는 대법원
판례(2012도10392)가 있습니다. <br/>
2. 실제로 거주했던 집에만 후기를 남겨주세요.<br/>
위 가이드라인을 지키지 않은 리뷰는 관리자에 의해 삭제될 수 있습니다.
</p>
           <div >
       
                <Select
                options={options} 
                value={options.find(op => {return op.value === choice })} 
                placeholder={<div className="select-placeholder-text">주소 검색</div>}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '5px',
                    colors: {
                    ...theme.colors,
                      primary25: 'lightgray',
                      primary: 'lightgray',
                    },
                  })}
                styles={customStyles}
                onChange={(value) => { onChange(value.code);
                  localStorage.setItem("danjiCode",value.code);
                }}/>
        </div>

<br></br>

        <div className="form-group">
                        <button class="community-submit"  block="block" onClick={()=>{window.location.href ='/reviews/create'}}>다음</button>
                    </div>
        </div>
    );
}

export default SearchHouse;