const mongoose = require('mongoose');
const mongoUrl ="mongodb+srv://bilel:trabelsi@cluster0.dn70h.mongodb.net/RestoDB?retryWrites=true&w=majority"

const connect =mongoose.connect(mongoUrl,{

    useNewUrlParser: true,
    useFindAndModify: false,
     useUnifiedTopology: true,

  }).then(result =>()=>{

      console.log('server is http://localhost/3000');

  }).catch(error =>console.log(error)); 

///////////////////////////////////////////////

  module.exports=connect; 
