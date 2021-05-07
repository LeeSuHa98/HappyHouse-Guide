import React, {useState, useEffect} from 'react';
import {
    Button,
    Table
} from 'reactstrap';
import axios from 'axios'
import './community.css'
import $ from 'jquery';
import{
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import CreateCommunity from './CreateCommunity'

const Communities =(props)=>{
   
    const [modalCreateCommunity, setModalCreateCommunity] = useState(false); 
    const [modalReadCommunityInfo, setModalReadCommunityInfo] = useState(false);
    const toggleCreateCommunity = () => setModalCreateCommunity(!modalCreateCommunity);
    const toggleReadCommunityInfo = () => setModalReadCommunityInfo(!modalReadCommunityInfo);
    const [modalInput, setModalInput] = useState("default");
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
    useEffect(() => {
        readActivityHistory()
    }
);
    $(function() { 
        $(".readCommunityInfo").off("click")
            $(".createCommunityButton").on("click",function(){
      
                var Button = $(this);
    
                var tr = Button.parent();
                var td = tr.children();
                setModalInput(td.eq(0).text());
                toggleCreateCommunity();
            }
            ) 
            $(".readCommunityInfo").on("click",function(){
                
                var Button = $(this);
    
                var tr = Button.parent();
                var td = tr.children();
                console.log("row데이터 : "+td.eq(0).text());
                setModalInput(td.eq(0).text());
                toggleReadCommunityInfo();
            }
            )       
        }
        )
    return (
        <div className="dv">
            <div className="createCommunity">
                      
                            <Button className={"createCommunityButton"}  style={{float: 'right'}} > 게시글 작성 </Button>
                    
                        </div>
      
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

                <Modal isOpen={modalCreateCommunity}>
                         <ModalHeader toggle={toggleCreateCommunity}>게시글 작성</ModalHeader>
                         <CreateCommunity postId={modalInput}></CreateCommunity>                         
            </Modal>
        </div>
    );
}
export default Communities;