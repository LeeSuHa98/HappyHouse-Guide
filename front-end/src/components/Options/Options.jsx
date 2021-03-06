import React from "react";

import "./Options.css";

const Options = (props) => {
    const options = [
        {
            text: "모집공고",
            handler: props.actionProvider.handleNotice,
            id: 1,
        },
        {
            text: "입주조건",
            handler: props.actionProvider.handleCondition,
            id: 2,
        },
        {
            text: "FAQ",
            handler: props.actionProvider.handleFAQ,
            id: 3,
        },
    ];

    const buttonMarkup = options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default Options;