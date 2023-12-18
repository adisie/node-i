const {Router} = require('express')

// route protector
const {privateRoutes} = require('../middlewares/privateRoutes')

// controllers
const {
    getAuthors,
    getAllPosts,
    addNewPost,
    updatePost,
    deletePost,
} = require('../controllers/postControllers')

const router = Router()

// get authors
router.get('/authors',getAuthors)

// get all posts
router.route('/').get(getAllPosts).post(privateRoutes,addNewPost)
// update post
router.route('/:_id').put(privateRoutes,updatePost).delete(privateRoutes,deletePost)


module.exports = router