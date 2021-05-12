import React, {useState, useEffect} from 'react';
import {Button, Progress, Table} from 'reactstrap';
import axios from 'axios'
import './Review.css'
import room1 from '../Image/room1.PNG'
import room2 from '../Image/room2.PNG'

const Review = (props) => {
    const handleTitleOnChange = (e) => {
        e.preventDefault();
        //setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        //setContent(e.target.value);
    }
 const reviewsTitle = (review) => (
        <tr key={review._id} id={review._id}>            
            <td>{review.title}</td>           
        </tr>
    );
    const [readReviewsTitle, setReadReviewsTitle] = useState();
    function readReviews() {
        axios
            .get('/happyhouse/reviews')
            .then(({data}) => {
                data = data.reviewList
               // setReadReviewTitle(data.map(reviewsTitle))
            })
    }
    useEffect(() => {
        //readReviewsTitle()
    });
    return (
        <div>
            <React.Fragment>
                

                    <div id="center">
                        <div class="pagination">
                            <a href="#">&laquo;</a>
                            <a href="#" class="active">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#">&raquo;</a>
                        </div>
                    </div>

        
              

            </React.Fragment>
        </div>
    )
}

export default Review;