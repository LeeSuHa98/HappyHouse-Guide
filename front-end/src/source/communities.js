import React, {useState, useEffect} from 'react';
import {
    Button,
    Table
} from 'reactstrap';
import axios from 'axios'

const Communities =(props)=>{
    useEffect(() => {
            readActivityHistory()
        }
    );
    
    const [activityHistoryList, setActivityHistoryList] = useState();
    const postsList = (community) => (
        <tr key={community.communityId} id={community.communityId}>
        <td>{community.userId}</td>                          
        <td>{community.title}</td>  
        <td>{community.content}</td>                  
        <td>{community.writeDate}</td>
        <td>{community.numberOfView}</td>
        </tr>
    );
    
    function readActivityHistory () {
        axios.get('https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/communities').then(({data}) => {
            data = data.communitysList
            setActivityHistoryList(data.map(postsList))
          })
    }
    return (
        <div className="dv">
            <Button  color={"primary"}  style={{float: 'right'}} >{"게시글 작성"}</Button>
                <Table class="tg" >
                    <thead>
                        <tr >
                            <th >작성자</th>                              
                            <th >제목</th>      
                            <th >내용</th>     
                            <th >작성날짜</th>                    
                            <th >조회수</th>
                        </tr>
                    </thead>
                    <tbody >                       
                        {activityHistoryList}
                    </tbody>
                </Table>
        </div>
    );
}
export default Communities;