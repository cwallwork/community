import React              from 'react';
import LoginForm          from './login/LoginForm.jsx';
import SignupForm         from './login/SignupForm.jsx';
import {clone}            from 'ramda';
import Header             from './community/Header.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.groundwork = this.props.groundwork;
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
          showSignup: true,
          loginErrors: [],
          signupErrors: []
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
        console.log(response)
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

    handleSignup(Formfields) {
      this.groundwork.profiles.create(Formfields)
      .then((resp) => this.setState({showSignup: false}))
      .catch((resp) => {
        if (resp.status == "400") {
          let newSignupErrors = clone(this.state.signupErrors);
          newSignupErrors.push("Your Signup was unsuccessful, please try again");
          this.setState({signupErrors: newSignupErrors});
        }
      });
    }

    render() {
        return (
          <div className="login_signup">
            <Header title="LOGIN OR SIGNUP"/>
            { this.state.showSignup
                ? <div className="signup_intro_text">
                    <p>
                      Sign up to host.
                    </p>
                    <p>
                      Hosting a Community Conversations Book Club is easy.<br/>
                      Choose a book, invite your guests, and start reading!
                    </p>
                    <p>
                      Sign up and you can access all the tools and resources you need to plan a great event and engage in a lively book club discussion.
                    </p>
                  </div>
                : undefined }

            { this.state.showSignup ? <SignupForm errors={this.state.signupErrors} handleSignup={this.handleSignup} /> : undefined }
            { !this.state.showSignup ? <p className="signup_thanks">Thanks for signing up. Please log in</p> : undefined }
            <LoginForm errors={this.state.loginErrors} handleLogin={this.handleLogin}/>
            
          </div>
          );
    }
}

export default Login;
