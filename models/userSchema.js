const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  name : String ,
  email :  String ,
  password :  String ,
  role : {type:String , default:"client"}

});
const user = mongoose.model('user',userSchema);
module.exports = user;