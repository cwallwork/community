import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';

import SignupForm from '../source/javascripts/login/SignupForm';

describe ('<SignupForm/>.validateAgainstSchema', () => {
  const signupForm = shallow(<SignupForm/>);
  const fields = { givenName: "", familyName: "", email: "", postalCode: "" };

  it ('should return an array of errors', () => {
    expect(signupForm.instance().validateAgainstSchema(fields)).to.be.instanceof(Array);
  });

  it ('should return an array of all field names when all fields are empty', () => {
    expect(signupForm.instance().validateAgainstSchema(fields)).to.eql(["givenName", "familyName", "email", "postalCode"]);
  });

  it('should return only three fields when email is valid', () => {
    const newFields = R.merge(fields, {email: "test@test.com"});
    expect(signupForm.instance().validateAgainstSchema(newFields)).to.eql(["givenName", "familyName", "postalCode"]);
  });
});

describe ('<SignupForm/>.getErrorMessages', () => {
  const signupForm = shallow(<SignupForm/>);

  it ('Should return the givenName error when passed that prop', () => {
    const errorProps = ["givenName"];
    expect(signupForm.instance().getErrorMessages(errorProps)).to.eql(["Please enter a First Name"]);
  });

  it ('Should return an empty array if there are no errors', () =>{
    expect(signupForm.instance().getErrorMessages([])).to.eql([]);
  });
});

describe ('<SignupForm/>.validate', () => {
  const signupForm = shallow(<SignupForm/>);
  let event = {};
  event.preventDefault = () => false;
  
  it ('Should add validation errors for every non-valid field', () => {
    signupForm.instance().validate(event);
    expect(signupForm.instance().state.validationErrors.length).to.eql(4);
  });

  it ('Should remove validation errors when valid fields are submitted', () => {
    let newFields = R.clone(signupForm.instance().state.fields);
    newFields.givenName = "Name";
    signupForm.instance().setState({fields: newFields});
    signupForm.instance().validate(event);
    expect(signupForm.instance().state.validationErrors.length).to.eql(3);
  });
});