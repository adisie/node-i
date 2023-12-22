// models
const Post = require('../models/postModel')

// get all posts
const getPosts = async (req,res) => {
    try{
        const posts = await Post.find().sort({createdAt: -1})
        res.status(200).json({posts})
    }catch(err){
        res.status(402).json({
            error: 'get posts error'
        })
    }
}

// add new post
const addPost = async (req,res) => {
    try{
        const author = req.user._id 
        const {body} = req.body 
        const post = await Post.create({author,body})
        res.status(200).json({post})
    }catch(err){
        res.status(400).json({
            error: 'add post error'
        })
    }
}

// update post
const updatePost = async (req,res) => {
    try{
        const {_id} = req.params 
        const post = await Post.findById(_id)
        if(!post){
            return res.status(402).json({
                error: 'post not found',
            })
        }
        if(post.author.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'you can\'t update others post'
            })
        }

        const {body} = req.body 
        const updatedPost = await Post.findOneAndUpdate({_id},{$set: {body}},{returnOriginal: false})
        res.status(200).json({updatedPost})
    }catch(err){
        res.status(400).json({
            error: 'update post error'
        })
    }
}

// delete post
const deletePost = async (req,res) => {
    try{
        const {_id} = req.params 
        const post = await Post.findById(_id)
        if(!post){
            return res.status(402).json({
                error: 'post not found'
            })
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'you can\'t delete others post'
            })
        }
        await Post.findByIdAndDelete(_id)
        res.status(200).json({
            message: 'post deleted',
            _id
        })
    }catch(err){
        res.status(400).json({
            error: 'delete post error'
        })
    }
}

// get authors
const getAuthors = async (req,res) => {
    try{
        const authors = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                },
            },
            {
                $project: {
                    _id: 1,
                    author: {
                        $arrayElemAt: ["$author.username",0]
                    },
                }
            }
        ])
        res.status(200).json({authors})
    }catch(err){
        res.status(400).json({
            error: 'get authors error'
        })
    }
}

module.exports = {
    getPosts,
    addPost,
    updatePost,
    deletePost,
    getAuthors,
}