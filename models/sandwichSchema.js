const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
    prixPrincipale : String ,
    nom : String ,
    compositions : Array,
    imageSandwich : String,

    ingrediants : [{type : Schema.Types.ObjectId , ref : 'ingrediant'}],
    
}, {timesTamps:true});

const sandwich = mongoose.model('sandwich',sandwichSchema);
module.exports = sandwich