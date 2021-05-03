import React from "react";
import "../Options/Options.css";

const Reviews = (props) => {
    const reviews = [
        {
            text: "최신순",
            handler: props.actionProvider.newestReviews,
            id: 1,
        },
        {
            text: "별점높은순",
            handler: props.actionProvider.highstRatedReviews,
            id: 2,
        },
        {
            text: "지역검색",
            handler: props.actionProvider.searchRegionReviews,
            id: 3,
        }
    ];

    const buttonMarkup = reviews.map((review) => (
        <button key={review.id} onClick={review.handler} className="option-button">
            {review.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}

export default Reviews;