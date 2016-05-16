import React              from 'react';
import SignupForm         from './login/SignupForm.jsx';
import {clone}            from 'ramda';
import Header             from './community/Header.jsx';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Signup';
        this.groundwork = this.props.groundwork;
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
          showSignup: true,
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
          <div className="signup">
            { this.state.showSignup ? <SignupForm errors={this.state.signupErrors} handleSignup={this.handleSignup} /> : undefined }
            { this.state.showSignup ? <p>Already have an account?</p> : undefined}
            { !this.state.showSignup ? <p className="signup_thanks">Thanks for signing up. Please log in</p> : undefined }
          </div>
          );
    }
}

export default Signup;
