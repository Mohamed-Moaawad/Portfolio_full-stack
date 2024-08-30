const mongoose = require('mongoose');


const ConnectionDB = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/MyPortfolio");
    console.log('Database is connected ');
}


module.exports = ConnectionDB;