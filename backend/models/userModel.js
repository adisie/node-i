const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true,'email address required'],
        unique: true,
        validate: [isEmail,'invalid email address'],
    },
    password: {
        type: String,
        required: [true,'password required'],
        minlength: [3,'password is too short'],
    },
},{
    timestamps: true,
})

// hashing password
userSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model('User',userSchema)