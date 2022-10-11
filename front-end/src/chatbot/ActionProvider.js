import axios from 'axios'
import { Component } from 'react';

class ActionProvider extends Component{
    constructor(createChatBotMessage, setStateFunc, createClientMessage, props) {
      super(props);
      this.createChatBotMessage = createChatBotMessage;
      this.setStateFunc = setStateFunc;
      this.createClientMessage = createClientMessage;
     
    }

    state = {
      loading: false,
      noticeList: []
    }
    
    // loadAsyncData = () => {
    //   let url = `https://joj5opq81m.execute-api.us-east-2.amazonaws.com/happyhouse/noticeInfo`;

    //   axios.get(url)
    //   .then(({data}) => {
    //     console.log("접근")
    //       this.setState({
    //         loading: true,
    //         noticeList: data.noticeInfoList
    //       });
    //   })
    //   .catch(e => {
    //     console.error(e);  // 에러표시
    //     this.setState({  
    //       loading: false
    //     });
    //   })
    // }
    
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
      let url = "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008800,LCC:Y"

      const message = this.createChatBotMessage(
        "성남시에 위치한 행복주택입니다. ",
      );
      const message2 = this.createChatBotMessage(
        <a href={url}>성남고등 A-1 행복주택 공고문으로 이동하기</a>
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    answerAddress2 = () => {
      let url = "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008808,LCC:Y"
      
      const message = this.createChatBotMessage(
        "충청남도 당진시에 위치한 행복주택입니다."
      );
      const message2 = this.createChatBotMessage(
        <a href={url}>당진석문A-3BL 행복주택 공고문으로 이동하기</a>
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    answerAddress3 = () => {
      let url = "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008776,LCC:Y"
      
      const message = this.createChatBotMessage(
        "강원도 원주시에 위치한 행복주택입니다."
      );
      const message2 = this.createChatBotMessage(
        <a href={url}>원주태장7 행복주택 공고문으로 이동하기</a>
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    answerAddress4 = () => {
      let url = "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008718,LCC:Y"
      
      const message = this.createChatBotMessage(
        "전라남도 영암군에 위치한 행복주택입니다."
      );
      const message2 = this.createChatBotMessage(
        <a href={url}>영암용앙3 행복주택 공고문으로 이동하기</a>
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    answerAddress5 = () => {
      let url = "https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0065.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300008681,LCC:Y"
      
      const message = this.createChatBotMessage(
        "전라남도 목포시에 위치한 행복주택입니다."
      );
      const message2 = this.createChatBotMessage(
        <a href={url}>목포용해2 6-1BL 행복주택 공고문으로 이동하기</a>
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    answerNothing = () => {
      const message = this.createChatBotMessage(
        "현재 공고중인 행복주택이 없습니다."
      );
      this.addMessageToState(message);

      this.initialQuestion();
    }

    handleCondition = () => {
      const message = this.createChatBotMessage("입주조건", <br/>);
      const message2 = this.createChatBotMessage("신청하고자 하는 유형을 선택해주세요.", { widget: "conditions" });
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    handleFAQ = () => {
      const message = this.createChatBotMessage("FAQ", <br/>);
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
      const message = this.createChatBotMessage("자격요건", <br/>);
      const message2 = this.createChatBotMessage(
        "궁금하신 정보를 클릭해보세요.", {widget: "qualificationRequirement", withAvatar: true}
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    faqQualificationRecuirementID1 = () => {
      const message = this.createChatBotMessage("입주조건에 지역은 상관이 없나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "젊은 계층(대학생 및 사회초년생)은 행복주택 건설지역 또는 연접지역에 재학/재직중이셔야 합니다. 이와는 다르게 주거급여수급자/고령자는 행복주택 건설지역에 거주하고 계셔야 신청이 가능하며, 산업단지 근로자는 거주 지역에 상관없이 건설지역에 위치한 산업단지에 종사하는 근로자가 해당됩니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID2 = () => {
      const message = this.createChatBotMessage("나이 제한은 없나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "대학생, 사회초년생, 신혼부부 모두 입주자격만 충족하면 나이 제한 없이 입주 신청이 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID3 = () => {
      const message = this.createChatBotMessage("무주택세대구성원이란 무엇인가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "무주택세대구성원이라 함은 해당 세대가 주택을 소유하고 있지 않은 세대의 세대주, 세대주와 동일한 세대별 주민등록표상에 등재되어 있는 세대원(세대주의 배우자 및 직계존/비속)을 말합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID4 = () => {
      const message = this.createChatBotMessage("월평균소득 확인하려면 어떻게 해야 하나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "국민건강보험 홈페이지에서 월평균소득 확인이 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID5 = () => {
      const message = this.createChatBotMessage("부모님이 유주택자인데 저도 유주택자인가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "직계존속이 주택 또는 분양권을 소유하고 있고 본인은 무주택자여도 부모님의 나이가 만 60세 미만이면 유주택자로 분류됩니다. 부모님이 만 60세 이상이라면 다주택자여도 본인은 무주택자입니다. 다만 부모님이 임대주택을 보유하고 있다면 부모님의 나이와 관계 없이 본인도 유주택자로 구분된다는 점을 주의해야 합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID6 = () => {
      const message = this.createChatBotMessage("무주택자의 정확한 기준이 뭔가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "무주택자란 신청자 본인지 주택(분양권 등 포함)을 소유하지 않은 자를 말합니다. 신청자 본인 주택 또는 분양권 등 소유 시 유주택자이나, 주택공급에 관한 규칙 53조에 따르는 경우는 유주택자라도 무주택으로 소명 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID7 = () => {
      const message = this.createChatBotMessage("미성년자도 신청 가능한가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "미성년자는 세대주 이면서 미성년자 본인과 동일한 세대별 주민등록표상에 등재된 세대원(배우자 또는 직계존‧비속)이 있는 경우에 한하여 신청가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqQualificationRecuirementID8 = () => {
      const message = this.createChatBotMessage("대학생의 대학소재지 판단기준이 뭔가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "대학생의 일반공급 기준 중 대학 소재지는 실제 본인이 재학중이거나, 입·복학 예정인 지역별 캠퍼스의 소재지를 기준으로 합니다. 원칙적으로 재학증명서상의 대학소재지(캠퍼스)를 기준으로 판단하며, 예외적으로 특정 학과 등이 재학증명서 상의 대학소재지(캠퍼스) 이외의 장소에서 수업을 받는 경우 대학소재지 이외의 장소에서 수학한다는 총(학)장 확인서류 제출시 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

     //FAQ Move In

    moveIn = () => {
      const message = this.createChatBotMessage("입주", <br/>);
      const message2 = this.createChatBotMessage(
        "궁금하신 정보를 클릭해보세요.", {widget: "moveIn", withAvatar: true}
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    faqMoveInID1 = () => {
      const message = this.createChatBotMessage("젊은계층 거주 가능 기간은 어떻게 되나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "젊은계층의 최대 거주기간은 6년입니다. 임대차 계약은 2년 단위로 갱신되며, 최초 계약을 포함해 3회까지 계약할 수 있습니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqMoveInID2 = () => {
      const message = this.createChatBotMessage("신혼부부 입주자 거주 가능 기간은 어떻게 되나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "신혼부부는 최대 10년까지 거주할 수 있습니다. 또한 자녀 수에 따라 최대 10년까지 거주 가능합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqMoveInID3 = () => {
      const message = this.createChatBotMessage("입주 전에 집을 볼 수 있나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "입주자 사전방문제도가 존재합니다. 입주에 앞서 세대내 각종 시설물의 설치 및 기능 상태를 입주자가 사전방문하여 각종 하자사항을 입주 전에 보수하고 입주초기에 하자로 인한 행정사항을 최소화하기 위한 제도입니다. 단, 지정 기간외의 출입은 불가합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqMoveInID4 = () => {
      const message = this.createChatBotMessage("행복주택 입주절차가 어떻게 되나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "입주절차는 아래 순서대로 진행됩니다. 1. 입주자 사전방문 2. 입주예약 3. 임시열쇠불출 4. 입주잔금 납부 5. 관리비 예치금 납부 6. 도시가스 예약 7. 입주수속 8. 입주"
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqMoveInID5 = () => {
      const message = this.createChatBotMessage("중간에 임대료는 안오르나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "매년 주변 임대료 시세를 조사해 표준 임대료를 갱신합니다. 다만 계약을 갱신할 때 임대료 상승 폭은 임대주택법이 정한 상한인 5%를 넘을 수 없습니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqMoveInID6 = () => {
      const message = this.createChatBotMessage("행복주택에서 반려견을 키워도 되나요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "장애인 보조견을 제외한 가축을 사육하기 위해서는 관리 주체의 동의를 받아야 합니다. 즉 관리 사무소에서 가축 사유 책임 서약서를 받고 인접 주민 동의서를 받아야 합니다. 이는 단지별로 상이할 수 있기에 관리사무소에 문의바랍니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    //FAQ Happy House

    happyHouse = () => {
      const message = this.createChatBotMessage("행복주택이란?", <br/>);
      const message2 = this.createChatBotMessage(
        "궁금하신 정보를 클릭해보세요.", {widget: "happyHouse", withAvatar: true}
      );
      this.addMessageToState(message);
      this.addMessageToState(message2);
    }

    faqHappyHouseID1 = () => {
      const message = this.createChatBotMessage("행복주택이 뭔가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "행복주택이란 대학생과 신혼부부, 청년 등을 위해서 직장과 학교가 가까운 곳이나 대중교통이 편리한 곳에 짓는 공공임대주택을 말합니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    faqHappyHouseID2 = () => {
      const message = this.createChatBotMessage("행복주택이 뭔가요 ?", <br/> );
      const message2 = this.createChatBotMessage(
        "대학생과 사회초년생용 주택은 독신자형 주택임을 감안하여 전용면적 약 16㎡(약 5평) 수준으로 공급됩니다. 신혼부부용 주택은 자녀를 둔 부부의 육아를 위해 전용면적 약 36㎡(약 11평) 수준으로 공급됩니다. 고령자 및 주거급여수급자용 주택은 독신 및 부부가구를 감안하여 전용면적 약 26㎡(약 8평) 수준으로 공급됩니다."
      );

      this.addMessageToState(message);
      this.addMessageToState(message2);

      this.initialQuestion();
    }

    addMessageToState = (message) => {
      this.setStateFunc((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }))
    }
  }
  
  export default ActionProvider;