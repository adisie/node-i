const {Router} = require('express')

// controllers
const {
    signupUser,
    loginUser,
    logoutUser,
} = require('../controllers/userControllers')

const router = Router()

// signup
router.post('/signup',signupUser)

// login
router.post('/login',loginUser)

// logout
router.get('/logout',logoutUser)


module.exports = router