const express = require('express')
const route = express.Router()
const { Signup, Signin } = require('../helpers/auth');

route.post('/signup', (req,res) => {
    const { email, password, cpassword} = req.body;
    Signup(email, password, cpassword)
    .then(response => res.json(response))
    .catch(err => res.json(err))

})

route.post('/signin', (req,res) => {
    const { email, password } = req.body;
    Signin(email, password)
    .then(response => res.json(response))
    .catch(err => res.json(err.message))
})

module.exports = route;