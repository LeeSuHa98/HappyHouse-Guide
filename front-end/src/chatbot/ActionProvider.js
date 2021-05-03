class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
    
    //Options Function

    handleNotice = () => {
      const message = this.createChatBotMessage(
        "모집공고 조회를 원하는 단지명 또는 건물명을 입력하세요.",
      );
      this.addMessageToState(message);
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

    handleCondition = () => {
      const message = this.createChatBotMessage("신청하고자 하는 유형을 선택해주세요.", { widget: "conditions" });
      this.addMessageToState(message);
    }

    handleReview = () => {
      const message = this.createChatBotMessage("궁금하신 거주후기의 유형을 선택해주세요.", { widget: "reviews"});
      this.addMessageToState(message);
    }

    //Conditions Function

    studentCondition = () => {
      const message = this.createChatBotMessage(
        "대학생 계층의 신청자격에 관한 정보입니다.",
        { widget: "student", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    youthCondition = () => {
      const message = this.createChatBotMessage(
        "청년 계층의 신청자격에 관한 정보입니다.",
        { widget: "youth", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    familyCondition = () => {
      const message = this.createChatBotMessage(
        "신혼부부 & 한부모가족 계층의 신청자격에 관한 정보입니다.",
        { widget: "family", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    oldCondition = () => {
      const message = this.createChatBotMessage(
        "고령자 계층의 신청자격에 관한 정보입니다.",
        { widget: "old", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    benefitCondition = () => {
      const message = this.createChatBotMessage(
        "주거급여수급자 계층의 신청자격에 관한 정보입니다.",
        { widget: "benefit", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    workerCondition = () => {
      const message = this.createChatBotMessage(
        "산업단지근로자 계층의 신청자격에 관한 정보입니다.",
        { widget: "worker", withAvatar: true }
      );
      
      this.addMessageToState(message);
    }

    //Reviews Function 

    newestReviews = () => {
      
    }

    highstRatedReviews = () => {

    }

    searchRegionReviews = () => {

    }

    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }))
    }
  }
  
  export default ActionProvider;