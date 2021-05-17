import KakaoLogin from 'react-kakao-login';
import loginK from '../Image/kakao_login.png'
const token = '081bccbedbe006325ef66fd79eeb49e0'

const LoginKakao = (props) => {

    const loginSuccess = (result) => {
        localStorage.setItem("userID",result.profile.kakao_account.email)
        localStorage.setItem("userToken", result.response.access_token)
        localStorage.setItem("userName",result.profile.kakao_account.profile.nickname)
        props.toggle()
        alert(result.profile.kakao_account.profile.nickname + "님 환영합니다.")
    }

  return (
    <div className="kakao-login">
      <KakaoLogin
        token={token}
        onSuccess={result => loginSuccess(result)}
        onFailure={result => alert(result)}
        getProfile={true}>

      <div style ={{
          color:'grey', textAlign:'left', marginLeft:'10px', border:'0'
      }}><img src={loginK} class="kakaoImage"/></div>
        </KakaoLogin>
    </div>
  );
};

export default LoginKakao;