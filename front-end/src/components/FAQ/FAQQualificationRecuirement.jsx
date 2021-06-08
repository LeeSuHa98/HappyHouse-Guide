import React from "react";
import "../Options/Options.css";

const FAQQualificationRecuirement = (props) => {
    const faqQualificationRecuirement = [
        {
            text: "입주조건에 지역은 상관이 없나요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID1,
            id: 1,
        },
        {
            text: "나이 제한은 없나요 ?",
            hadler: props.actionProvider.faqQualificationRecuirementID2,
            id: 2,
        },
        {
            text: "무주택세대구성원이란 무엇인가요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID3,
            id: 3,
        },
        {
            text: "월평균소득 확인하려면 어떻게 해야 하나요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID4,
            id: 4,
        },
        {
            text: "부모님이 유주택자인데 저도 유주택자인가요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID5,
            id: 5,
        },
        {
            text: "무주택자의 정확한 기준이 뭔가요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID6,
            id: 6,
        },
        {
            text: "미성년자도 신청 가능한가요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID7,
            id: 7,
        },
        {
            text: "대학생의 대학소재지 판단기준이 뭔가요 ?",
            handler: props.actionProvider.faqQualificationRecuirementID8,
            id: 8,
        }
    ]
    const buttonMarkup = faqQualificationRecuirement.map((faq) => (
        <button key={faq.id} onClick={faq.handler} className="option-button">
            {faq.text}
        </button>
    ));


    return <div className="options-container">{buttonMarkup}</div>
}
export default FAQQualificationRecuirement;