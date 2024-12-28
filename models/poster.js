const mongoose = require('mongoose')

const PostertModel = new mongoose.Schema({
    title: { type:String },
    img: { type:String }
})

module.exports = mongoose.model('poster', PostertModel)