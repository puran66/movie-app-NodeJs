const mongoose = require('mongoose');

const dbConnect = () =>{
  mongoose.connect(process.env.DB).then(()=>{
    console.log("db connceted successfully");
  }).catch((err)=>{
    console.log(err,"from db connect");
  })
}

module.exports = dbConnect;