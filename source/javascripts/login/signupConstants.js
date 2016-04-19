module.exports = {

  signupErrors: {
    givenName: "Please enter a First Name",
    familyName: "Please enter a Last Name",
    email: "Please enter a valid Email address",
    zipCode: "Please enter a valid Zip Code"
  },

  signupSchema: {
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
        pattern: /.+@.+/
      },
      zipCode: {
        type: 'string',
        minLength: 1,
        pattern: /^[0-9]*$/
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 100,
        pattern: /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9$^+=])(.{8,15})$/
      }
    }
  }
};