import React              from 'react';
import LoginForm          from './login/LoginForm.jsx';
import SignupForm         from './login/SignupForm.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.groundwork = this.props.groundwork;
        this.state = {
          showSignup: true,
          loginErrors: [],
          signupErrors: []
        }
    }

    loginUser(email,password){
      this.groundwork.auth.fetchUsingPassword(email,password)
      .then((response) => {
        console.log(response)
        this.props.history.push('/Community');
      })
      .catch((response) => {
        console.log(repsponse);
      });
    }
    render() {
        return (
          <div className="login_signup">
            <h4>Log in or Sign Up</h4>
            { this.state.showSignup ? <SignupForm errors={this.state.signupErrors} handleSignup={this.state.handleSignup} /> : undefined }
            <LoginForm errors={this.state.loginErrors} handleLogin={this.handleLogin}/>
          </div>
          );
    }
}

export default Login;
