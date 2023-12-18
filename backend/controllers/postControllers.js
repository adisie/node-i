
// models
const Post = require('../models/postModel')

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
                }
            },
            {
                $project: {
                    _id: 1,
                    user_id: {
                        $arrayElemAt: ["$author._id",0]
                    },
                    username: {
                        $arrayElemAt: ["$author.username",0]
                    }
                }
            }
        ])


        res.status(200).json({authors})
    }catch(err){
        res.status(200).json({
            error: 'GET-AUTHORS-ERROR'
        })
    }
}

// get all posts
const getAllPosts = async (req,res) => {
    try{
        const posts = await Post.find().select({author: 1,_id: 1,body: 1,createdAt: 1}).sort({createdAt: -1})

        res.status(200).json({posts})
    }catch(err){
        res.status(400).json({
            error: 'GET-POSTS-ERROR'
        })
    }
}

// add new post
const addNewPost = async (req,res) => {
    try{
        const author = req.user._id 
        const {body} = req.body 
        const newPost = await Post.create({author,body})
        const post = {
            _id: newPost._id,
            author: newPost.author,
            body: newPost.body,
            createdAt: newPost.createdAt
        }
        res.status(200).json({post})
    }catch(err){
        res.status(400).json({
            error: 'ADD-POST-ERROR'
        })
    }
}

// update post
const updatePost = async (req,res) => {
    try{
        const {body} = req.body 
        const post = await Post.findById({_id: req.params._id})
        if(!post){
            return res.status(400).json({
                error: 'POST-NOT-FOUND'
            })
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: "UNAUTHORIZED-TO-UPDATE"
            })
        }

        await Post.updateOne({_id: req.params._id},{body})
        const updatedPost = await Post.findById({_id: req.params._id})
        res.status(200).json({updatedPost})

    }catch(err){
        res.status(400).json({
            error: 'UPDATE-POST-ERROR'
        })
    }
}

// delete post
const deletePost = async (req,res) => {
    try{
        const {_id} = req.params 
        const post = await Post.findById({_id})
        if(!post){
            return res.status(400).json({
                error: 'POST-NOT-FOUND'
            })
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'UNAUTORIZED-TO-DELETE'
            })
        }

        await Post.deleteOne({_id})
        res.status(200).json({_id})
        
    }catch(err){
        res.status(400).json({
            error: 'DELETE-POST-ERROR'
        })
    }
}


module.exports = {
    getAuthors,
    getAllPosts,
    addNewPost,
    updatePost,
    deletePost,
}