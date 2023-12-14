const jwt = require('jsonwebtoken')

// models
const User = require('../models/userModel')


// private routes
const privateRoutes = async (req,res,next) => {
    try{
        // get token from cookie
        const token = req.cookies.auth 
        if(!token){
            return res.status(401).json({
                error: 'AUTH-FAILED'
            })
        }
        const decodedToken = jwt.verify(token,process.env.JWT_KEY)
        const user = await User.findById(decodedToken._id)
        if(!user){
            return res.status(401).json({
                error: 'AUTH-FAILED'
            })
        }
        req.user = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            error: 'AUTH-FAILED'
        })
    }
}


module.exports = {
    privateRoutes,
}