const express = require('express')
const route = express.Router()
const { OneProduct, AddtoCart } = require('../helpers/index')

route.get('/product/:id', (req,res) => {
    const { id } = req.params;
    OneProduct(id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

route.post('/add-to-cart', (req,res) => {
    const { user_id,products_id } = req.body; 
    AddtoCart(products_id, user_id)
    .then(response => res.json(response))
    .catch(err => res.json(err))

})

module.exports = route;