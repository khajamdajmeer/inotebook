const mongoose = require('mongoose');

const mongoURI =  'mongodb://127.0.0.1:27017/';


const connecttoMongo = async()=>{
 await mongoose.connect(mongoURI)
 console.log('sucess db')
}

module.exports = connecttoMongo;