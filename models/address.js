const mongoose = require('mongoose')

const AddressModel = new mongoose.Schema({
    user_id : { type:String },
    countri : { type:String },
    name: { type:String },
    phone : { type:Number },
    pincode : { type:Number },
    address : { type:String },
    state : { type:String }
})

module.exports = mongoose.model('address', AddressModel)