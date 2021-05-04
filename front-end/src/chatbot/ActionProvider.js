class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
    
    initialQuestion = () => {
      const message = this.createChatBotMessage("더 궁금한 것이 있으신가요 ?", { widget: "options" });
      this.addMessageToState(message);
    }
    //Options Function

    handleNotice = () => {
      const message = this.createChatBotMessage("모집공고", <br/>);
      const message2 = this.createChatBotMessage(
        "모집공고 조회를 원하는 단지명 또는 건물명을 입력하세요.",
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
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

      this.initialQuestion();
    }

    handleCondition = () => {
      const message = this.createChatBotMessage("입주조건", <br/>);
      const message2 = this.createChatBotMessage("신청하고자 하는 유형을 선택해주세요.", { widget: "conditions" });
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    handleReview = () => {
      const message = this.createChatBotMessage("거주후기", <br/>);
      const message2 = this.createChatBotMessage("궁금하신 거주후기의 유형을 선택해주세요.", { widget: "reviews"});
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    handleFAQ = () => {
      const message = this.createChatBotMessage("자주 묻는 질문", <br/>);
      const message2 = this.createChatBotMessage("궁금하신 정보를 선택해주세요.", { widget: "faq"});
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    //Conditions Function

    studentCondition = () => {
      const message = this.createChatBotMessage("대학생", <br/>);
      const message2 = this.createChatBotMessage(
        "대학생 계층의 신청자격에 관한 정보입니다.",
        { widget: "student", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    youthCondition = () => {
      const message = this.createChatBotMessage("청년", <br/>);
      const message2 = this.createChatBotMessage(
        "청년 계층의 신청자격에 관한 정보입니다.",
        { widget: "youth", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    familyCondition = () => {
      const message = this.createChatBotMessage("신혼부부 & 한부모가족", <br/>);
      const message2 = this.createChatBotMessage(
        "신혼부부 & 한부모가족 계층의 신청자격에 관한 정보입니다.",
        { widget: "family", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    oldCondition = () => {
      const message = this.createChatBotMessage("고령자", <br/>);
      const message2 = this.createChatBotMessage(
        "고령자 계층의 신청자격에 관한 정보입니다.",
        { widget: "old", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    benefitCondition = () => {
      const message = this.createChatBotMessage("주거급여수급자", <br/>);
      const message2 = this.createChatBotMessage(
        "주거급여수급자 계층의 신청자격에 관한 정보입니다.",
        { widget: "benefit", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    workerCondition = () => {
      const message = this.createChatBotMessage("산업단지근로자", <br/>);
      const message2 = this.createChatBotMessage(
        "산업단지근로자 계층의 신청자격에 관한 정보입니다.",
        { widget: "worker", withAvatar: true }
      );
      
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    //Reviews Function 

    newestReviews = () => {
      
    }

    highstRatedReviews = () => {

    }

    searchRegionReviews = () => {

    }

    //FAQ Function
    applyHouse = () => {
      const message = this.createChatBotMessage("신청", <br/>);
      const message2 = this.createChatBotMessage(
        "궁금하신 정보를 클릭해보세요.", {widget: "apply", withAvatar: true}
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    //FAQ Apply Function
    faqApplyID1 = () => {
      const message = this.createChatBotMessage("신청시기는 언제인가요 ?", <br/>);
      const message2 = this.createChatBotMessage(
        "행복주택은 지구별 사업시행자(ex. LH공사, SH공사 등)가 다르기 때문에 사업지구별 입주자 모집공고에 따라 진행됩니다. 모집공고는 대략 준공 1년 전에 시행되나, 현장 상황에 따라 달라질 수 있으므로 각 지구별 공고문은 ' 행복주택 블로그 '를 참고하시어 입주 신청을 하시면 됩니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqApplyID2 = () => {
      const message = this.createChatBotMessage("신청방법은 어떻게 되나요 ?", <br/>);
      const message2 = this.createChatBotMessage(
        "‘LH 청약센터’홈페이지에 접속하시면 간편하게 하실 수 있습니다. 상단 메뉴중에서 ‘인터넷청약’의 ‘청약신청-임대주택’을 클릭하면 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqApplyID3 = () => {
      const message = this.createChatBotMessage("선정절차에 대해 궁금해요 !", <br/> );
      const message2 = this.createChatBotMessage(
        "1) 사업시행자가 지자체와 협의하여 정한 기준 및 절차에 따라 건설량의 50%의 범위 내에서 우선공급 대상자를 선정합니다. 2) 일반공급 대상자는 사업시행자가 추첨으로 선발합니다. 3) 계층별로 세대수의 20%이상 예비입주자를 선정합니다. 4) 모집 결과 일부 계층이 미달될 경우, 공공주택사업자가 주택유형 등을 고려하여, 타 계층에게 물량을 전환하여 공급할 수 있습니다. 5) 퇴거자가 있을 경우에는 예비입주자 순위에 따라 입주할 수 있고,  예비 입주자가 없을 경우 일반공급 절차에 따라, 입주자를 추가 모집합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqApplyID4 = () => {
      const message = this.createChatBotMessage("중복신청은 가능한가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "중복 신청 할 경우 전부 무효 처리됩니다. 단, 입주자 모집공고일이 다른 경우, 조건에 해당한다면 중복신청이 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqApplyID5 = () => {
      const message = this.createChatBotMessage("대학생인데 청약통장이 없는데 신청이 가능한가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "대학생과 취약 계층은 청약통장이 없어도 입주 신청을 할 수 있습니다. 그 외에는 반드시 주택청약종합저축 가입자여야 합니다. 청약저축 가입자는 저축 납부 횟수나 금액과 관계없이 통장만 있다면 입주 신청을 할 수 있습니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqApplyID6 = () => {
      const message = this.createChatBotMessage("다른 지역 행복주택에 신청 가능한가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "가능합니다. 18년도부터 자신이 거주하는 지역에 상관없이 신청 가능합니다. 다만 청약신청은 순위제를 적용하기 때문에 인근 지역 거주자가 더 유리합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    //FAQ Qualification Recuirement

    qualificationRequirement = () => {
      
    }

    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }))
    }
  }
  
  export default ActionProvider;