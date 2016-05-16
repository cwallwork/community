import React              from 'react';
import LoginForm          from './login/LoginForm.jsx';
import {clone, isEmpty}   from 'ramda';
import Header             from './community/Header.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.groundwork = this.props.groundwork;
        this.handleLogin = this.handleLogin.bind(this);
        this.showReset = this.showReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);

        this.state = {
          loginErrors: [],
          showReset: false,
          hasReset: false,
          resetEmail: "",
          resetErrors: ""
        }
    }

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
        if(this.groundwork.auth.auth.gwid) {
          this.context.router.push('/community');
        }
    }

    handleLogin(email,password){
      this.groundwork.auth.fetchUsingPassword(email,password)
      .then((response) => {
        console.log(response);
        this.context.router.push('/community');
      })
      .catch((response) => {
        console.log(response);
        let newLoginErrors = clone(this.state.loginErrors);
        if (response.status == "401") {
          newLoginErrors.push("Incorrect username or password");
        }
        else {
          newLoginErrors.push("Something went wrong, please try again");
        }
        this.setState({loginErrors: newLoginErrors});
      });
    }

    resetPassword(){
      this.groundwork.profiles.requestResetToken(this.state.resetEmail)
      .then((resp) => {
        console.log(resp);
        if (resp.status == 200) {
          this.setState(
            {
              showReset:false,
              hasReset: true,
              resetErrors: ""
          });
        }
        else {
          this.setState ({
            resetErrors: "Something went wrong, please try again",
            resetEmail: ""
            });
        }
      })
      .catch((resp) => {
        console.log(resp);
        if (resp.status == 404) {
          this.setState({
            resetErrors: "That email was not found, please re-check and try again",
            resetEmail: ""
          })
        }
        else {
              this.setState({
                resetErrors: "Something went wrong, please try again",
                resetEmail: ""
              });
        }
      })
    }

    update(event) {
      this.setState({resetEmail: event.target.value});
    }

    showReset(event) {
      event.preventDefault();
      this.setState({showReset: true});
    }

    render() {
        return (
          <div className="login">
            <Header title="LOGIN"/>
            <LoginForm errors={this.state.loginErrors} handleLogin={this.handleLogin}/>
            {this.state.showReset ?
              <form className="password_reset_form">
                <label>Email Address</label>
                <input type="text" onChange={(e) => this.update(e)} value={this.state.resetEmail}/>
                <button onClick={this.resetPassword}>Reset Password</button>
              </form>
              : this.state.hasReset
                  ? <p className="reset_confirm_text">
                      Your password has been reset. Please check your email to set a new password.
                    </p>
                  : <button onClick={(e) => this.showReset(e)} href="#">Forgot password?</button>
            }
            {
              !isEmpty(this.state.resetErrors)
              ? <p className="reset_error_text">
                  {this.state.resetErrors}
                </p>
              : undefined
            }
          </div>
        );
    }
}

export default Login;
