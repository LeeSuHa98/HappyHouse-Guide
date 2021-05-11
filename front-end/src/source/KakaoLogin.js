import KakaoLogin from 'react-kakao-login';

const token = '081bccbedbe006325ef66fd79eeb49e0'



const LoginKakao = (props) => {

    const loginSuccess = (result) => {
        localStorage.setItem("userID",result.profile.kakao_account.email)
        localStorage.setItem("userToken", result.response.access_token)
        props.setUserID(result.profile.kakao_account.profile.nickname)
        props.toggle()
        alert(result.profile.kakao_account.profile.nickname + "님 환영합니다.")
    }

  return (
    <div className="kakao-login">
      <KakaoLogin
        token={token}
        onSuccess={result => loginSuccess(result)}
        onFailure={result => alert(result)}
        getProfile={true}
      />
    </div>
  );
};

export default LoginKakao;