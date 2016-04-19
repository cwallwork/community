import React                                  from 'react';
import {loginErrors, loginSchema}             from './loginConstants.js';
import {validateForm}                         from '../utils/formValidate.js';
import {isEmpty, clone}                       from 'ramda';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginForm';
        
        this.state = {
          fields: {
                    email: "",
                    password: ""
                  },
          validationErrors: []
        }
    }

    update(event){
      let newFields = clone(this.state.fields);
      newFields[event.target.name] = event.target.value;
      this.setState({fields: newFields});
    }

    validate(event) {
      event.preventDefault();

      const newErrors = validateForm(this.state.fields, loginErrors, loginSchema);
      this.setState({validationErrors: newErrors});

      if (isEmpty(newErrors)) {
        const fields = this.state.fields;      
        this.props.handleLogin( fields.email, fields.password);
      }
    }

    render() {
      const {
        email,
        password
      } = this.state.fields;

      const validationErrors = this.state.validationErrors;
      const loginErrors = this.props.errors;

        return (
          <div className="login_container">
            <h4>Login</h4>
            { !isEmpty(loginErrors)
              ? <div className="login_errors">
                  {loginErrors.map((error,idx) => <p className="login_error_paragraph" key={idx}>{error}</p>)}
                </div>
              : undefined
            }
            <form className="login_form">
              <label>Email Address</label>
              <input type="email" value={email} name="email" onChange={(e) => this.update(e)}/>
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={(e) => this.update(e)}/>
              <button onClick={ (e) => this.validate(e)}>SEND </button>
            </form>
            { !isEmpty(validationErrors)
                ? <div className="form_errors">
                    {validationErrors.map( (error, idx) => <p key={idx} className="error_paragraph">{error}</p>)}
                  </div>
                : undefined
            }
          </div>
          )
    }
}

export default LoginForm;
