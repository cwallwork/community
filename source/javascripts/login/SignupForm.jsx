import React                                         from 'react';
import R                                             from 'ramda';
import {validate}                                    from "jsonschema";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SignupForm';
        this.update = this.update.bind(this);

        this.signupSchema = {
          id: '/Signup',
          type: 'object',
          properties: {
            givenName: {
              type: 'string',
              minLength: 1
            },
            familyName:  {
              type: 'string',
              minLength: 1
            },
            email: {
              type: 'string',
              minLength: 1,
              pattern: /.+@.+/
            },
            postalCode: {
              minLength: 1,
              pattern: /^[0-9]*$/
            }
          }
        }

        this.signupErrors = {
          givenName: "Please enter a First Name",
          familyName: "Please enter a Last Name",
          email: "Please enter a valid Email address",
          postalCode: "Please enter a valid Zip Code"
        }

        this.state = {
          givenName: "",
          familyName: "",
          email: "",
          postalCode: "",
          validationErrors: [],
        }
    }

    update(event){
      let newState = R.clone(this.state);
      newState[event.target.name] = event.target.value;
      this.setState({newState});
    }

    validate(event){
      event.preventDefault();
      const rejectNonStrings = R.reject((value) => R.type(value) !== 'String');
      const propsWithErrors = this.getErrors(validate(rejectNonStrings(this.state),this.signupSchema));

      let newErrors = (props) => this.getErrorMessages(props);
      this.setState({validationErrors: newErrors(propsWithErrors)})
    }

    getErrors(result) {
      const isolatePropNames = R.map((errorMessage) => return errorMessage.split('.')[1]);
      const getProps = R.map((error) => error.property);
      return R.compose(R.uniq,isolatePropNames,getProps,result);
    }

    getErrorMessages(props) {
      return R.map((prop) => this.signupErrors(prop));
    }

    render() {
        return (
          <div className="signup_container">
            <form className="signup_form">
              <label>First Name</label>
              <input type="text" name="givenName" value={this.state.givenName} onChange={(e) => this.update(e)}/>
              <label>Last Name</label>
              <input type="text" name="familyName" value={this.state.familyName} onChange={(e) => this.update(e)}/>
              <label>Email address</label>
              <input type="text" name="email" value={this.state.email} onChange={(e) => this.update(e)}/>
              <label>Zip code</label>
              <input type="text" name="postalCode" value={this.state.postalCode} onChange={(e) => this.update(e)}/>
              <button type="submit" onClick={ (e) => this.validate(e)} >Submit</button>
            </form>
          </div>
          );
    }
}

export default SignupForm;
