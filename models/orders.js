const mongoose = require('mongoose')
const product = require('./product')

const OrdersModel = new mongoose.Schema({
    user_id: { type:String },
    amount: { type:Number },
    quantity: { type:Number },
    address: { type:Array },
    product: { type:Array },
    paymethods: { type:String },
    order_date: { type:String },
    delivery_date: { type:String },
    delivered: { type:Boolean, default:false },
    status: { type:String, default:'Preparing for Shipment' }
})

module.exports = mongoose.model('Orders', OrdersModel)