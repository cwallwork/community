import {validate}                                    from 'jsonschema';
import {map, uniq, compose}                          from 'ramda';

module.exports = {
   validateForm: (fields, errors, schema) => {

    function getErrorMessages(result) {
      const isolatePropNames = map((errorMessage) => errorMessage.split('.')[1]);
      const getProps = map((error) => error.property);
      const getUniqueProps = compose(uniq,isolatePropNames,getProps);
      return getMessagesForProps(getUniqueProps(result));
    };

    function getMessagesForProps(props) {
      return map((prop) => errors[prop], props);
    };

    return getErrorMessages(validate(fields, schema).errors);
  },  
}
