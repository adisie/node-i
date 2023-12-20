const bcryptjs = require('bcryptjs')

// models
const User = require('../models/userModel')

// utils
const {
    MAX_AGE,
    errorHandler,
    generateToken,
} = require('../utils/userUtils')

// signup user
const signupUser = async (req,res) => {
    try{
        const {username,email,password} = req.body 
        const user = await User.create({username,email,password})
        // generate token
        const token = generateToken(user._id)
        // set token in cookie
        res.cookie('auth',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        }})
    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

// login user
const loginUser = async (req,res) => {
    try{
        const {username,password} = req.body 
        if(!username.trim()){
            throw new Error('username required')
        }

        if(!password){
            throw new Error('password required')
        }
        const user = await User.findOne({username})
        if(!user){
            throw new Error('username not exist')
        }

        const isPassMatch = bcryptjs.compareSync(password,user.password)
        if(!isPassMatch){
            throw new Error('Wrong password')
        }

        // token 
        const token = generateToken(user._id)
        // set token on cookie
        res.cookie('auth',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        }})

    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

// logout user
const logoutUser = (req,res) => {
    try{
        res.cookie('auth','',{maxAge: 1})
        res.status(200).json({
            message: 'logged out'
        })
    }catch(err){
        res.status(400).json({
            error: 'logout error'
        })
    }
}


module.exports = {
    signupUser,
    loginUser,
    logoutUser,
}