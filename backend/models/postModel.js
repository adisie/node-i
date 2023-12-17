const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    body: {
        type: 'String',
        required: true,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Post',postModel)