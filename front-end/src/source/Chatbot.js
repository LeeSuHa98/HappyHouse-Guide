import Chatbot from "react-chatbot-kit"
import chatbot2 from '../Image/helpEx.png'
import cancel from '../Image/loupe.png'
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';
import './css/Menubar.css'
import './css/Sidebar.css'

const HappyChatbot = (props) => {
    
  const chatbotFAQ = () => {
    var con = document.getElementById("chatbot");
    var con2 = document.getElementById("chatbotM");
    if(con.style.display==='none'){
      con.style.display='block';
      con2.style.display='none';
    }else{
      con.style.display='none';
      con.style.display='none'; 
      con2.style.display='block';
    }
  }

  return (
    <div>
        <div id="chatbot" className="chatbot-show">
          <Chatbot 
          config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div>
        <div id = "chatbotM">
            <div id = "messageText1"><img src={cancel} id="cancelImg"/>청년 행복주택 알리미 </div>
            <div id = "messageText2">무엇을 도와드릴까요?</div>
        </div>
        <img alt="chatbot" src={chatbot2} className="chatbot-button" onClick={() => chatbotFAQ()}/>

    </div>
  );
};

export default HappyChatbot;