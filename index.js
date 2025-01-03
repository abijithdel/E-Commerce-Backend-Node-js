const express = require('express')
const core = require('cors');
const path = require('path');
const app = express()
const fs = require('fs')
require('./config/mongodb')

app.use(core())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

const AuthRouter = require('./routers/auth')
const AdminRouter = require('./routers/admin')
const IndexRouter = require('./routers/index')

app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)
app.use('/', IndexRouter)

const public = './public'
const poster_path = './public/poster-img'
const product_path = './public/pro-imgs'

if(!fs.existsSync(public)){
    try {
        fs.mkdirSync(public)
    } catch (error) {
        console.log(error)
    }
}

if(!fs.existsSync(poster_path)){
    try {
        fs.mkdirSync(poster_path)
    } catch (error) {
        console.log(error)
    }
}

if(!fs.existsSync(product_path)){
    try {
        fs.mkdirSync(product_path)
    } catch (error) {
        console.log(error)
    }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Server Rinning on Port ${PORT}`))