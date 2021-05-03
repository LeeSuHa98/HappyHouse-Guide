class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message);

      const lowercase = message.toLowerCase();

      if(lowercase.includes("hello")){
        this.actionProvider.greet();
      }

      if(lowercase.includes("서울오류 행복주택")){
        this.actionProvider.answerAddress();
      }
    }
  }
  
  export default MessageParser;
  