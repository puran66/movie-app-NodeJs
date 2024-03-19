const mongoose = require('mongoose');

const dbConnect = () =>{
  mongoose.connect("mongodb://127.0.0.1:27017/movie-app").then(()=>{
    console.log("db connceted successfully");
  }).catch((err)=>{
    console.log(err,"from db connect");
  })
}

module.exports = dbConnect;