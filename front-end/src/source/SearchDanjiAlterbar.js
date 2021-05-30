import React, { useState, useEffect } from "react";
import Select from 'react-select'
import axios from 'axios';
import './css/SearchBar.css'

const SearchDanjiAlertBar = (props) => {
    const [options, setData] = useState([])
    const [choice, setChoice] = useState(); 

    useEffect(() => {
        loadAsyncData();
      }, [])
  
      const loadAsyncData = () => {
          let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/houseinfos/address`;
  
          axios.get(url).then(({data}) => {
              data = data.houseInfoList
              setData(data.map(houseInfoList => ({value: houseInfoList.danjiName, label: houseInfoList.danjiName, state: houseInfoList.danjiName})))
          })
      }
    

    const onChange = (state) => {
        alert(state)
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

    return(
        <div className = "search-danji-alert-bar">
                <Select
                options={options} 
                value={options.find(op => {return op.value === choice })} 
                placeholder={<div className="select-placeholder-text">주소 검색 review 용</div>}
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
                onChange={(value) => { onChange(value.state); }}/>
        </div>
    )

};

export default SearchDanjiAlertBar;