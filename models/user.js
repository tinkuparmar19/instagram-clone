const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    following: [{
        type: ObjectId,
        ref: 'User'
    }],
    pic: {
        type: String,
        default: 'https://res.cloudinary.com/panther123/image/upload/v1606993616/profile_vhlqd0.png'
    }
})

mongoose.model('User', userSchema)