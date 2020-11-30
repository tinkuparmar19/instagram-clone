const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get('/user/:id',requireLogin, (req, res) => {
    User.findOne({_id: req.params.id})
    .select('-password')
    .then(user => {
        Post.find({postedBy: req.params.id})
        .populate('postedBy', '_id name')
        .exec((e, posts) => {
            if(e) {
                return res.status(422).json({error:e})
            } 
            res.json({user, posts})
        })
    }).catch(e => {
        return res.status(404).json({error: 'user not found'})
    })
})



module.exports = router