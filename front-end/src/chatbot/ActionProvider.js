class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    
    greet = () => {
      const message = this.createChatBotMessage("hello friend.");
      this.addMessageToState(message);
    }

    handleNotice = () => {
      const message = this.createChatBotMessage(
        "모집공고 조회를 원하는 단지명 또는 건물명을 입력하세요.",
      );
      this.addMessageToState(message);
    }

    handleCondition = () => {
      const message = this.createChatBotMessage()
    }

    answerAddress = () => {
      const message = this.createChatBotMessage(
        "해당주택에 관한 공고문입니다. ",
      );
      const message2 = this.createChatBotMessage(
        "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008358,LCC:Y#MN::CLCC_MN_0010:"
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }))
    }
  }
  
  export default ActionProvider;