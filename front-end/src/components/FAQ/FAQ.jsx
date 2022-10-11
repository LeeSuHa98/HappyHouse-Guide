import React from "react";
import "../Options/Options.css";

const FAQ = (props) => {
    const faq = [
        {
            text: "신청",
            handler: props.actionProvider.applyHouse,
            id: 1,
        },
        {
            text: "자격요건",
            handler: props.actionProvider.qualificationRequirement,
            id: 2,
        },
        {
            text: "입주",
            handler: props.actionProvider.moveIn,
            id: 3,
        },
        {
            text: "행복주택이란?",
            handler: props.actionProvider.happyHouse,
            id: 4,
        }
    ]
    const buttonMarkup = faq.map((faq) => (
        <button key={faq.id} onClick={faq.handler} className="option-button">
            {faq.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default FAQ;