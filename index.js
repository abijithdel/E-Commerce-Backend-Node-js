const express = require('express')
const core = require('cors');
const path = require('path');
const app = express()
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

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Server Rinning on Port ${PORT}`))