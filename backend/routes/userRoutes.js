const {Router} = require('express')

// controllers
const {
    signupUser,
    loginUser,
    logoutUser,
} = require('../controllers/userControllers')

// middlewares
const { privateRoutes } = require('../middlewares/privateRoutes')

const router = Router()

// signup
router.post('/signup',signupUser)

// login
router.post('/login',loginUser)

// logout
router.get('/logout',logoutUser)

// auth checker
router.get('/auth-check',privateRoutes,(req,res)=>{
    res.status(200).json({
        message: 'AUTHORIZED',
        user: req.user,
    })
})


module.exports = router