const jwt = require('jsonwebtoken')

// modles
const User = require('../models/userModel')

const routeProtector = async (req,res,next) => {
    try{
        // get token
        const token = req.cookies.auth 
        if(!token){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        // check validity
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const user = await User.findById(decoded._id)
        if(!user){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        req.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        next()

    }catch(err){
        res.status(401).json({
            error: 'unauthorized'
        })
    }
}

module.exports = {
    routeProtector,
}