//define model and schema here
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

//modeule bnaakr export kr rhe hai
module.exports = mongoose.model("users",userSchema);