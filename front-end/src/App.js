import './App.css';
import axios from 'axios';
import React, {useState} from 'react'

function App() {

  const [item, getItem] = useState([])

  function getPost() {
    axios.get("https://n72s3qi251.execute-api.us-east-1.amazonaws.com/happyhouse/houseInfo")
    .then(response => { 
      const houseInfoList = response.data[0];
      getItem(houseInfoList)
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      {getPost()}
      {item}
    </div>
  );
}

export default App;
