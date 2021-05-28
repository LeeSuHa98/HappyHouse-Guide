class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message);

      const lowercase = message.toLowerCase();

      if(lowercase.includes("성남고등") || lowercase.includes("성남") || lowercase.includes
      ("고등") || lowercase.includes("성남시")){
        this.actionProvider.answerAddress();
      }

      if(lowercase.includes("당진석문") || lowercase.includes("당진") || lowercase.includes
      ("석문") || lowercase.includes("당진시")){
        this.actionProvider.answerAddress2();
      }
    
      if(lowercase.includes("원주태장") || lowercase.includes("원주") || lowercase.includes
      ("태장") || lowercase.includes("원주시")){
        this.actionProvider.answerAddress3();
      }

      if(lowercase.includes("영암용앙") || lowercase.includes("영암") || lowercase.includes
      ("용앙") || lowercase.includes("영암군")){
        this.actionProvider.answerAddress4();
      }

      if(lowercase.includes("목포용해") || lowercase.includes("목포") || lowercase.includes
      ("용해") || lowercase.includes("목포시")){
        this.actionProvider.answerAddress5();
      }
      
      else{
        this.actionProvider.answerNothing();
      }
    }
  }
  
  export default MessageParser;
  