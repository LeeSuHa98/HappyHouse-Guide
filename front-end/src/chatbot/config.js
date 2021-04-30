import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";

const config = {
  botName: "청년행복주택 알리미",
  initialMessages: [createChatBotMessage(`안녕하세요. 청년행복주택 알리입니다! 무엇을 도와드릴까요?`, {
    widget: "options",
  })],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {}
    },
    
  ]
}
  
  export default config;