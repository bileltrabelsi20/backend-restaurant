const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
    
    prixPrincipale : String ,
    nom : String ,
    compositions : Array,
    imageBurger : String,

    ingrediants : [{type : Schema.Types.ObjectId , ref : 'ingrediant'}],
 
}, {timesTamps:true});

const burger = mongoose.model('burger',burgerSchema);
module.exports = burger