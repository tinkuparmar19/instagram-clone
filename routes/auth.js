const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const { JWT_KEY } = require('../config/keys')

router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if(!name || !email || !password) {
        return res.status(422).json({ error: 'please fill all the fields'})
    }
    User.findOne({email: email})
    .then((saveUser) => {
        if(saveUser) {
            return res.status(422).json({ error: 'this email is already exist'})
        }
        bcrypt.hash(password, 12)
        .then(hashpassword => {
            const user = new User({
                email,
                name,
                password: hashpassword,
                pic
            })
            user.save()
            .then(user => {
                res.json({message: 'saved successfully'})
            })
            .catch(err => {
                console.log(err)
            })
        })  
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(422).json({error: 'please add email and password'})
    }
    User.findOne({email: email})
    .then(saveUser => {
        if(!saveUser) {
            return res.status(422).json({error: 'invalid email or password'})
        }
        bcrypt.compare(password, saveUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign({_id: saveUser._id}, JWT_KEY)
                const { _id, name, email, followers, following, pic } = saveUser
                res.json({token, user: {_id, name, email, followers, following, pic}})
            } else {
                return res.status(422).json({error: 'invalid email or password'})
            }
        }) 
        .catch(err => {
            console.log(err)
        })
    })

})

module.exports = router
