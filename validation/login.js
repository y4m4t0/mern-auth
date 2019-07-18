const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function(data){
    let errors = {};
    
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(Validator.isEmpty(data.username) || Validator.isEmpty(data.password)){
        errors.name = 'Please fill in all the fields'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}