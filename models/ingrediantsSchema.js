const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingrediantsSchema = new Schema({
    prixIngrediant : String ,
    nomIngrediant : String ,
    imageIngrediant:String
    
}, {timesTamps:true});

const ingrediant = mongoose.model('ingrediant',ingrediantsSchema);
module.exports = ingrediant