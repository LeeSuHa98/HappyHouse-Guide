import React from "react";
import "../Options/Options.css";

const FAQHappyHouse = (props) => {
    const faqHappyHouse = [
        {
            text: "행복주택이 뭔가요 ?",
            handler: props.actionProvider.faqHappyHouseID1,
            id: 1,
        },
        {
            text: "행복주택 공급 면적은 얼마나 되나요 ?",
            hadler: props.actionProvider.faqHappyHouseID2,
            id: 2,
        }
    ]
    const buttonMarkup = faqHappyHouse.map((faq) => (
        <button key={faq.id} onClick={faq.handler} className="option-button">
            {faq.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default FAQHappyHouse;