const express = require('express')
const route = express.Router()
const { isAdmin } = require('../helpers/admin')

route.post('/isadmin',(req,res)=>{
    const { id } = req.body
    isAdmin(id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

module.exports = route;