const express = require('express')
const core = require('cors');
const app = express()
require('./config/mongodb')

app.use(core())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AuthRouter = require('./routers/auth')
const AdminRouter = require('./routers/admin')

app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Server Rinning on Port ${PORT}`))