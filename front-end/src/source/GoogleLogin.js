import GoogleLogin from 'react-google-login';

const token = '16301779236-cu5jqqh23f4fa748ft5420nfqrinf1vc.apps.googleusercontent.com'



const LoginGoogle = (props) => {

    
    const loginSuccess = (result) => {
        localStorage.setItem("userID",result.profileObj.email)
        localStorage.setItem("userToken", result.accessToken)
        props.setUserID(result.profileObj.name)
        props.toggle()
        alert(result.profileObj.name + "님 환영합니다.")
    }

  return (
    <div className="google-login">
      <GoogleLogin
        clientId={token}
        buttonText="Login"
        onSuccess={result => loginSuccess(result)}
        onFailure={result => alert(result)}
      />
    </div>
  );
};

export default LoginGoogle;