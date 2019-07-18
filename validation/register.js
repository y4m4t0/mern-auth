const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(Validator.isEmpty(data.username)){
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    if( !Validator.isLength(data.password, { min:6, max: 30 })){
        errors.password = "Password should contain between 6 and 30 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}