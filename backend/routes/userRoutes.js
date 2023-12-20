const {Router} = require('express')

const router = Router()

// controllers
const {
    signupUser,
    loginUser,
    logoutUser,
} = require('../controllers/userControllers')

// middlewares
const {routeProtector} = require('../middlewares/routeProtector')

// signup
router.post('/signup',signupUser)

// login
router.post('/login',loginUser)

// lgout
router.get('/logout',logoutUser)

// checker
router.get('/check-user',routeProtector,(req,res)=>{
    res.status(200).json({
        message: 'ok',
        user: req.user,
    })
})

module.exports = router