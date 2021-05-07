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
    ModalHeader
} from 'reactstrap';
import CreateCommunity from './CreateCommunity'
import ReadCommunity from './ReadCommunity';
const Communities =(props)=>{
    const [modalInput, setModalInput] = useState("default"); 
    const [modalCreateCommunity, setModalCreateCommunity] = useState(false); 
    const [modalReadCommunity, setModalReadCommunity] = useState(false);
    const toggleCreateCommunity = () => setModalCreateCommunity(!modalCreateCommunity);
    const toggleReadCommunity = () => setModalReadCommunity(!modalReadCommunity);
    const [activityHistoryList, setActivityHistoryList] = useState();

    const postsList = (community) => (
        <tr key={community._id} id={community._id}>
        <td>{community._id}</td>
        <td>{community.userId}</td>                          
        <td className={"readCommunity"}>{community.title}</td>  
        <td>{community.content}</td>                  
        <td>{community.writeDate}</td>
        <td>{community.numberOfView}</td>
        </tr>
    );
    
    function readActivityHistory () {
        axios.get('/happyhouse/communities').then(({data}) => {
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
            $(".readCommunity").on("click",function(){
                
                var Button = $(this);
    
                var tr = Button.parent();
                var td = tr.children();
                console.log("row데이터 : "+td.eq(0).text());
                setModalInput(td.eq(0).text());
                toggleReadCommunity();
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
                            <th >id</th>
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
                         <CreateCommunity></CreateCommunity>                         
                </Modal>

                <Modal isOpen={modalReadCommunity}>
                         <ModalHeader toggle={toggleReadCommunity}>게시글 상세조회</ModalHeader>
                         <ReadCommunity _id={modalInput}></ReadCommunity>                         
                </Modal>
        </div>
    );
}
export default Communities;