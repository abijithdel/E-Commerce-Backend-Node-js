const mongoose = require('mongoose')

const CartModel = new mongoose.Schema({
    user_id: { type:String },
    product_ids: [{
        id: { type:String }
    }]
})

module.exports = mongoose.model('cart', CartModel)