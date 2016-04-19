module.exports = {

  loginErrors: {
    email: "Please enter a valid email address",
    password: "Please enter a password"
  },

  loginSchema: {
    id: '/Login',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            pattern: /.+@.+/
          },
        password: {
          type: 'string',
          minLength: 8
        }
      }
    }
};