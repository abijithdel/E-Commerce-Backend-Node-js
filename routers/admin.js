const express = require('express')
const route = express.Router()
const { isAdmin, UploadProduct } = require('../helpers/admin')
const Upload = require('../config/multer')

route.post('/isadmin',(req,res)=>{
    const { id } = req.body
    isAdmin(id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

route.post('/upload-product', Upload.single('img'),(req,res) => {
   const { name,price,category,description } = req.body;
   const filename = req.file.filename
   UploadProduct(name,price,category,description,filename)
   .then(response => res.json(response))
   .catch(err => res.json(err))
})

module.exports = route;