const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  Name : String ,
  email :  String ,
  password :  String ,
  role : {type:String , default:"client"}

  
},{timestamps:true});
const user = mongoose.model('user',userSchema);
module.exports = user;