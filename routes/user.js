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

router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {
        new: true
    }, (e, result) => {
        if(e) {
            res.status(422).json({error: e})
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {
            new: true
        })
        .select('-password')
        .then(result => {
            res.json(result)
        }).catch(e => {
            return res.status(422).json({error: e})
        })
    })
})

router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {
        new: true
    }, (e, result) => {
        if(e) {
            res.status(422).json({error: e})
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {
            new: true
        })
        .select('-password')
        .then(result => {
            res.json(result)
        }).catch(e => {
            return res.status(422).json({error: e})
        })
    })
})

router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})


module.exports = router