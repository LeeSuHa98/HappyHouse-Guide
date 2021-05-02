import React, {useState, useEffect} from 'react';
import {
    Button,
    Progress,
    Table
} from 'reactstrap';
import axios from 'axios'
import './reviews.css';

const Test =(props)=>{
    return (
        <div className="dv">
            <Button  color={"primary"}  style={{float: 'right'}} >{"거주후기 작성"}</Button>
                <Table class="tg" >
                    <thead>
                        <tr >
                            <th >작성자</th>                              
                            <th >주택지역</th>      
                            <th >주택유형</th>     
                            <th >제목</th>                    
                            <th >작성날짜</th>
                            <th >평점</th>
                        </tr>
                    </thead>
                    <tbody >                 
                    </tbody>
                </Table>
        </div>
    );
}
export default Test;