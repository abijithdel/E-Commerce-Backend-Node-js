const express = require('express')
const route = express.Router()
const { Signup } = require('../helpers/auth');

route.post('/signup', (req,res) => {
    const { email, password, cpassword} = req.body;
    Signup(email, password, cpassword)
    .then(response => res.json(response))
    .catch(err => res.json(err))

})

module.exports = route;