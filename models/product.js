const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
    name: { type:String },
    price: { type:Number },
    category : { type:String },
    description : { type:String },
    filename : { type:String },
})

module.exports = mongoose.model('product', ProductModel)