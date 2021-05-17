import GoogleLogin from 'react-google-login';
import loginG from '../Image/google_login.png'
const token = '16301779236-cu5jqqh23f4fa748ft5420nfqrinf1vc.apps.googleusercontent.com'


const LoginGoogle = (props) => {
    
    const loginSuccess = (result) => {
        localStorage.setItem("userID",result.profileObj.email)
        localStorage.setItem("userToken", result.accessToken)
        localStorage.setItem("userName",result.profileObj.name)
        props.toggle()
        alert(result.profileObj.name + "님 환영합니다.")
    }

  return (
    <div className="google-login">
      <GoogleLogin
        clientId={token}
        onSuccess={result => loginSuccess(result)}
        onFailure={result => alert(result)}
        icon={false}
        buttonText="">

        <div className="GoogleBtn"><img  src ={loginG} className="googleImage"/>Google 로그인</div> 
      </GoogleLogin>
    </div>
  );
};

export default LoginGoogle;