const jwt = require('jsonwebtoken')

// max age
const MAX_AGE = 60 * 60 * 24

// error handler
const errorHandler = err => {
    // console.log(err)
    const errors = {username: '',email: '',password: ''}

    // required fields
    if(err.message === 'username required'){
        errors.username = 'username required'
    }

    if(err.message === 'password required'){
        errors.password = 'password required'
    }

    if(err.message === 'username not exist'){
        errors.username = 'username not exist'
    }

    if(err.message === 'wrong password'){
        errors.password = 'wrong password'
    }

    // duplicate key
    if(err.code === 11000){
        if(err.message.includes('username')){
            errors.username = 'username already exist'
        }

        if(err.message.includes('email')){
            errors.email = 'email address already exist'
        }
    }

    // user validation error
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// token generator
const generateToken = _id => {
    return jwt.sign({_id},process.env.JWT_KEY,{expiresIn: MAX_AGE})
}

module.exports = {
    MAX_AGE,
    errorHandler,
    generateToken,
}