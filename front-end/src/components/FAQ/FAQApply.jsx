import React from "react";
import "../Options/Options.css";

const FAQApply = (props) => {
    const faqApply = [
        {
            text: "신청시기는 언제인가요 ?",
            handler: props.actionProvider.faqApplyID1,
            id: 1,
        },
        {
            text: "신청방법은 어떻게 되나요 ?",
            hadler: props.actionProvider.faqApplyID2,
            id: 2,
        },
        {
            text: "선정절차에 대해 궁금해요 !",
            handler: props.actionProvider.faqApplyID3,
            id: 3,
        },
        {
            text: "중복신청은 가능한가요 ?",
            handler: props.actionProvider.faqApplyID4,
            id: 4,
        },
        {
            text: "대학생인데 청약통장이 없는데 신청이 가능한가요 ?",
            handler: props.actionProvider.faqApplyID5,
            id: 5,
        },
        {
            text: "다른 지역 행복주택에 신청 가능한가요 ?",
            handler: props.actionProvider.faqApplyID6,
            id: 6,
        }
    ]
    const buttonMarkup = faqApply.map((faq) => (
        <button key={faq.id} onClick={faq.handler} className="option-button">
            {faq.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default FAQApply;