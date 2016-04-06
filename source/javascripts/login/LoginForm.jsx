import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginForm';
    }
    render() {
        return (
          <div className="login_container">
            <form className="login_form">
            </form>
          </div>
          )
    }
}

export default LoginForm;
