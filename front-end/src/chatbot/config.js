import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Conditions from '../components/Conditions/Conditions'
import Reviews from '../components/Reviews/Reviews'
import FAQ from '../components/FAQ/FAQ'
import FAQApply from '../components/FAQ/FAQApply'
import FAQMoveIn from '../components/FAQ/FAQMoveIn'
import FAQQualificationRecuirement from "../components/FAQ/FAQQualificationRecuirement";

import Student from '../components/Conditions/StudentOptions'
import Youth from '../components/Conditions/YouthOptions'
import Family from '../components/Conditions/FamilyOptions'
import Old from '../components/Conditions/OldOptions'
import Benefit from '../components/Conditions/BenefitOptions'
import Worker from '../components/Conditions/WorkerOptions'
import FAQHappyHouse from "../components/FAQ/FAQHappyHouse";

const config = {
  botName: "청년행복주택 알리미",
  initialMessages: [createChatBotMessage(`청년행복주택 알리미입니다 ! 무엇을 도와드릴까요?`, {
    widget: "options",
  })],
  state: {
    gist: "",
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {}
    },
    {
      widgetName: "conditions",
      widgetFunc: (props) => <Conditions {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "faq",
      widgetFunc: (props) => <FAQ {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "apply",
      widgetFunc: (props) => <FAQApply {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "qualificationRequirement",
      widgetFunc: (props) => <FAQQualificationRecuirement {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "moveIn",
      widgetFunc: (props) => <FAQMoveIn {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "student",
      widgetFunc: (props) => <Student {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "youth",
      widgetFunc: (props) => <Youth {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "family",
      widgetFunc: (props) => <Family {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "old",
      widgetFunc: (props) => <Old {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "benefit",
      widgetFunc: (props) => <Benefit {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "worker",
      widgetFunc: (props) => <Worker {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "moveIn",
      widgetFunc: (props) => <FAQMoveIn {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    },
    {
      widgetName: "happyHouse",
      widgetFunc: (props) => <FAQHappyHouse {...props}/>,
      mapStateToProps: ["gist"],
      props: {}
    }
  ]
}
  
  export default config;