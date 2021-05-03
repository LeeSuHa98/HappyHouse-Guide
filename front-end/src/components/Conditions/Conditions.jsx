import React from "react";

import "../Options/Options.css";

const Conditions = (props) => {
    const conditions = [
        {
            text: "대학생",
            handler: props.actionProvider.studentCondition,
            id: 1,
        },
        {
            text: "청년",
            handler: props.actionProvider.youthCondition,
            id: 2,
        },
        {
            text: "신혼부부 & 한부모가족",
            handler: props.actionProvider.familyCondition,
            id: 3,
        },
        {
            text: "고령자",
            handler: props.actionProvider.oldCondition,
            id: 4,
        },
        {
            text: "주거급여수급자",
            handler: props.actionProvider.benefitCondition,
            id: 5,
        },
        {
            text: "산업단지근로자",
            handler: props.actionProvider.workerCondition,
            id: 6,
        },
    ];

    const buttonMarkup = conditions.map((condition) => (
        <button key={condition.id} onClick={condition.handler} className="option-button">
            {condition.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default Conditions;