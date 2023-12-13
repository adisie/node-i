require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log('CONNECTED')
    app.listen(process.env.PORT,()=>{
        console.log("LISTENING")
    })
  })
  .catch(err=>{
    console.log(err)
    process.exit(1)
  })

