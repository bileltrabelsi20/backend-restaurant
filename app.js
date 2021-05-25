const express = require('express');
const connect = require('./dataBase/connect');
const userApi = require('./routes/userApi');
const sandwichApi = require ('./routes/sandwichApi');
const ingrediantApi = require ('./routes/ingrediantApi')
const burgerApi = require ('./routes/burgerApi')
const tacosApi = require ('./routes/tacosApi')
const mailer = require ('./routes/sendMail')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

////////////////////////////////////////////////////////////

app.use(cors())
app.use(bodyParser.json());
var urlencodeParser = bodyParser.urlencoded({extended:false});

/////////////////////////////////////////////////////////////

app.use ('/user' , userApi);
app.use ('/login', userApi);
app.use ('/menu' , sandwichApi);
app.use ('/menu' , ingrediantApi);
app.use ('/menu' , burgerApi);
app.use ('/menu' , tacosApi);
app.use ('/mail' , mailer);

/////////////////////////////////////////////////////////////

app.listen(3000,()=>{
    console.log('done');
})