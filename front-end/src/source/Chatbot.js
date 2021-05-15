import Chatbot from "react-chatbot-kit"
import chatbot2 from '../Image/help.png'
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';

import './Sidebar.css'

const HappyChatbot = (props) => {
    
    const chatbotFAQ = () => {
        var con = document.getElementById("chatbot");
        if(con.style.display==='none'){
          con.style.display='block';
        }else{
          con.style.display='none';
        }
      }

  return (
    <div className="chatbot-container">
      
        <div id="chatbot" className="chatbot-show">
          <Chatbot 
          config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div>
        <img alt="chatbot" src={chatbot2} className="chatbot-button" onClick={() => chatbotFAQ()}/>

    </div>
  );
};

export default HappyChatbot;