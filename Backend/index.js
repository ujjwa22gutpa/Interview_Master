
require("dotenv").config()
const express = require("express");
const MongoDBConnection= require('./model/DBModel')
const cookieParser = require("cookie-parser")

/* require all the routes here */
const authRoute = require("./routes/auth.routes")


const app = express();
const PORT = process.env.PORT || 3000;
MongoDBConnection()
app.use(cookieParser())
app.use(express.json());
// app.use(cors());

/* using all the routes */
app.use('/api/auth',authRoute)

app.listen(PORT, (req,res)=>{
    console.log(`server is running or PORT ${PORT}`)
})