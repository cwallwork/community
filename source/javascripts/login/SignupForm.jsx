import React                                         from 'react';
import R                                             from 'ramda';
import {signupErrors, signupSchema}                  from './signupConstants.js';
import {validateForm}                                from '../utils/formValidate.js';
import {isEmpty}                                     from 'ramda';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SignupForm';
        this.update = this.update.bind(this);   

        this.state = {
          fields: {
            givenName: "",
            familyName: "",
            email: "",
            zipCode: "",
            password: ""
          },
          validationErrors: [],
        }
    }

    update(event){
      let newFields = R.clone(this.state.fields);
      newFields[event.target.name] = event.target.value;
      this.setState({fields: newFields});
    }

    validate(event){
      event.preventDefault();
      
      const newErrors = validateForm(this.state.fields, signupErrors, signupSchema);

      if (isEmpty(newErrors)) {      
        this.props.handleSignup(this.state.fields);
      }
      else {
        this.setState({validationErrors: newErrors});
      }
    }

    render() {

      const {
        givenName,
        familyName,
        email,
        zipCode,
        password,
      } = this.state.fields;

      const errors = this.state.validationErrors;
      const signupFailMessages = this.props.errors;

        return (
          <div className="signup_container">
            { !isEmpty(signupFailMessages)
                ? <div className="singup-errors">
                  {signupFailMessages.map( (error, idx) => <p key={idx} className="singup_error_paragraph">{error}</p>)}
                  </div>
                : undefined
            }
            <form className="signup_form">
              <label>First Name</label>
              <input type="text" name="givenName" value={givenName} onChange={(e) => this.update(e)}/>
              <label>Last Name</label>
              <input type="text" name="familyName" value={familyName} onChange={(e) => this.update(e)}/>
              <label>Email address</label>
              <input type="text" name="email" value={email} onChange={(e) => this.update(e)}/>
              <label>Zip code</label>
              <input type="text" name="zipCode" maxLength="5" value={zipCode} onChange={(e) => this.update(e)}/>
              <label>Password</label>
              <input type="text" name="password" maxLength="100" value={password} onChange={(e) => this.update(e)}/>
              <p>Passwords must be at least 8 characters long and contain: an upper case letter, a lower case letter, and a number.</p>
              <button type="submit" onClick={(e) => this.validate(e)} >Submit</button>
            </form>
            { !isEmpty(errors) 
                ? <div className="form_errors">
                    {errors.map( (error, idx) => <p key={idx} className="error_paragraph">{error}</p>)}
                  </div>
                : undefined
            }
          </div>
        );
    }
}

export default SignupForm;
