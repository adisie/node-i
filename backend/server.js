require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log("CONNECTED")
    app.listen(process.env.PORT,()=>{
        console.log("LISTENING")
    })
  })
  .catch(err=>{
    console.log(err)
    process.exit(1)
  })

// routes
app.use('/api/user',require('./routes/userRoutes'))