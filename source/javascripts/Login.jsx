import React              from 'react';
import LoginForm          from './login/LoginForm.jsx';
import SignupForm         from './login/SignupForm.jsx';
import {clone}            from 'ramda';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.groundwork = this.props.groundwork;
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
          showSignup: true,
          loginErrors: [],
          signupErrors: []
        }
    }

    handleLogin(email,password){
      this.groundwork.auth.fetchUsingPassword(email,password)
      .then((response) => {
        console.log(response)
        this.props.history.push('/Community');
      })
      .catch((response) => {
        console.log(repsponse);
      });
    }

    handleSignup(Formfields) {
      debugger;
      this.groundwork.profiles.create(Formfields)
      .then((resp) => this.setState({showSignup: false}))
      .catch((resp) => {
        if (resp.status = "400") {
          let newSignupErrors = clone(this.state.signupErrors);
          newSignupErrors.push("Your Signup was unsuccessful, please try again");
          debugger;
          this.setState({signupErrors: newSignupErrors});
        }
      });
    }

    render() {
        return (
          <div className="login_signup">
            <h4>Log in or Sign Up</h4>
            { this.state.showSignup ? <SignupForm errors={this.state.signupErrors} handleSignup={this.handleSignup} /> : undefined }
            <LoginForm errors={this.state.loginErrors} handleLogin={this.handleLogin}/>
          </div>
          );
    }
}

export default Login;
