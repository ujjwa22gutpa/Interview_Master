const mongoose = require("mongoose");

const connectDB = process.env.MONGO_URI;

const MongoDBConnection = async()=>{
  await  mongoose.connect(connectDB)
    .then(()=>{
        console.log('MONGODB has benn connected')
    })
    .catch((err)=>{
        console.log(`Connection failed ${err}`)
    })
}


module.exports = MongoDBConnection