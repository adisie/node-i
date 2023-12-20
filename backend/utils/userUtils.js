const jwt = require('jsonwebtoken')

// max-age constant
const MAX_AGE = 60 * 30

// error handler
const errorHandler = err => {
    const errors = {username: '',email: '',password: ''}
    if(err.message === 'username required'){
        errors.username = 'username required'
    }
    if(err.message === 'password required'){
        errors.password = 'password required'
    }
    if(err.message === 'username not exist'){
        errors.username = 'username not exist'
    }
    if(err.message === 'Wrong password'){
        errors.password = 'Wrong password'
    }
    if(err.code === 11000){
        if(err.message.includes('username')){
            errors.username = 'username already exist'
        }

        if(err.message.includes('email')){
            errors.email = 'email already exist'
        }
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// generate token
const generateToken = _id => {
    return jwt.sign({_id},process.env.JWT_KEY,{expiresIn: MAX_AGE})
}


module.exports = {
    MAX_AGE,
    errorHandler,
    generateToken,
}