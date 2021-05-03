import React, {useState, useEffect} from 'react';
import {
    Button,
    Progress,
    Table
} from 'reactstrap';
import axios from 'axios'

const Reviews =(props)=>{
    useEffect(() => {
            readActivityHistory()
        }
    );
    
    const [activityHistoryList, setActivityHistoryList] = useState();
    const reviewsList = (reviews) => (
        <tr key={reviews._id} id={reviews._id}>
        <td>{reviews.userId}</td>                          
        <td>{reviews.regon}</td>  
        <td>{reviews.houseType}</td>                  
        <td>{reviews.title}</td>
        <td>{reviews.writeDate}</td>
        <td> <Progress value={reviews.star} max="5" /></td>
     </tr>
    );
    
    function readActivityHistory () {
        axios.get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/reviews').then(({data}) => {
            data = data.reviewList
            setActivityHistoryList(data.map(reviewsList))
          })
    }
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
                        {activityHistoryList}
                    </tbody>
                </Table>
        </div>
    );
}
export default Reviews;