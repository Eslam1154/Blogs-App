const express = require("express")
const app = express()
const routes = require("./routes")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
// const routes = require("./routes")



app.use(express.json())
app.use(cookieParser())
app.use("/api/blog",express.static("./uploads"))
app.use('/api', routes)

// const crypto = require('crypto')
// console.log(crypto.randomBytes(32).toString("hex"))

const url = process.env.DB_CONNECTION_URL
mongoose.connect(url,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("data base connected !!")
})
.catch((err) => {
    console.log(err.message)
})


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`The server is running on port ${port}` )
})




//  npm init -y
// npm i libs 
// clever back end => organization file 