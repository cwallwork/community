import React                              from 'react';
import Querystring                        from 'querystring';
import Header                             from './community/Header.jsx';
import { has, takeWhile, isEmpty }        from 'ramda';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'PasswordReset';
        this.groundwork = this.props.groundwork;
        this.resetPassword = this.resetPassword.bind(this);

        this.state = {
          token: "",
          password: "",
          reset: false,
          error: "",
          givenName: ""
        }
    }

    componentWillMount() {
      const ampTest = char => char != "&";
      const newToken = takeWhile(ampTest, window.location.href.slice(window.location.href.indexOf("token=")+6)).join("");
      this.setState({token: newToken});
    }

    resetPassword(event) {
      event.preventDefault();
      if(isEmpty(this.state.password)) {
        return;
      }
      
      this.groundwork.profiles.resetPassword(this.state.token, this.state.password)
      .then((resp) => {
        console.log(resp);
        if(resp.status == 200) {
          this.setState({
            reset: true,
            error: ""
          });
        }
      })
      .catch((resp) => {
        console.log(resp);
        if(has('password',resp.profile)) {
          this.setState({error: "The password is invalid"});
        }
        else {
          this.setState({error: "Something went wrong, please try again"});
        }
      })
    }

    update(event) {
      this.setState({password: event.target.value});
    }

    render() {

        const {
          reset,
          error,
          givenName,
        } = this.state;

        return (
          <div className="password_reset_container">
            <Header title="RESET PASSWORD"/>
            <h3>Enter a new password</h3>
            <p>Passwords must:</p>
            <ul>
              <li>Be a minimum of 8 characters</li>
              <li>Contain a uppercase letter</li>
              <li>Contain a lowercase letter</li>
              <li>Contain a number</li> 
            </ul>
            {
              reset
              ? <div className="password_reset_thanks">
                  <p>
                    Thank you for resetting your password {givenName}. You can now <a href="/#/login">log in</a>
                  </p>
                </div>              
              :
              <form className="password_reset_form">
                <label>New Password</label>
                <input type="text" value={this.state.password} onChange={(e) => this.update(e)}/>
                <button onClick={(e) => this.resetPassword(e)}>Reset Password</button>
              </form>
            }
            {
              !isEmpty(error)
              ? <p className="reset_error">
                  {error}
                </p>
              : undefined
            }          
          </div>
        );
    }
}

export default PasswordReset;
