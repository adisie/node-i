const {Router} = require('express')

// controllers
const {
    getPosts,
    addPost,
    updatePost,
    deletePost,
    getAuthors,
} = require('../controllers/postControllers')

// middlewares
const {routeProtector} = require('../middlewares/routeProtector')

const router = Router()

// get posts and add post
router.route('/').get(getPosts).post(routeProtector,addPost)

// update and delete post
router.route('/:_id').put(routeProtector,updatePost).delete(routeProtector,deletePost)

// get authors
router.get('/authors',getAuthors)


module.exports = router