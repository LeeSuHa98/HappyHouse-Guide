import React from "react";
import "../Options/Options.css";

const FAQMoveIn = (props) => {
    const faqMoveIn = [
        {
            text: "젊은계층 거주 가능 기간은 어떻게 되나요 ?",
            handler: props.actionProvider.faqMoveInID1,
            id: 1,
        },
        {
            text: "신혼부부 입주자 거주 가능 기간은 어떻게 되나요 ?",
            hadler: props.actionProvider.faqMoveInID2,
            id: 2,
        },
        {
            text: "입주 전에 집을 볼 수 있나요 ?",
            handler: props.actionProvider.faqMoveInID3,
            id: 3,
        },
        {
            text: "행복주택 입주절차가 어떻게 되나요 ?",
            handler: props.actionProvider.faqMoveInID4,
            id: 4,
        },
        {
            text: "중간에 임대료는 안오르나요 ?",
            handler: props.actionProvider.faqMoveInID5,
            id: 5,
        },
        {
            text: "행복주택에서 반려견을 키워도 되나요 ?",
            handler: props.actionProvider.faqMoveInID6,
            id: 6,
        }
    ]
    const buttonMarkup = faqMoveIn.map((faq) => (
        <button key={faq.id} onClick={faq.handler} className="option-button">
            {faq.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default FAQMoveIn;