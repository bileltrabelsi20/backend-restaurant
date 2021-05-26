const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const passport = require ('passport')
const bearer = require ('passport-http-bearer');

//////////////////////////// Register //////////////////////////////////

router.post('/register', async (req, res) => {
const addUser = await User.findOne({ email: req.body.email });
   if (addUser == null) {
       // 1. Hash the password 
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
       // 2. save the hash in the password
       req.body.password = hash; 
      User.create(req.body).then( async(userData) => {
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'Point.B.restaurant@gmail.com',
         pass: 'bileltrabelsi'
      },
      });
      let info = await transporter.sendMail({
         from: 'Point.B.restaurant@gmail.com',
         to: req.body.email,
         subject: "BIENVENUE ! " ,
         text: req.body.Name ,
         html: `bonjour ` + req.body.Name + ` votre compte vient d'être créé <br> simple click <br>  http://localhost:4200 `
         });
         res.json(userData)
      })
        .catch(error => {
         console.log(error);
         res.status(500).json({message : 'server error'});
      });
      }
      else {
          res.status(400).json({message : 'email  exist!'});
      }
      });
/////////////////////////////////////// Login /////////////////////////////////////////////

router.post('/login', async (req, res) => {
const connectedUser = await User.findOne({ email: req.body.email });

   if (!connectedUser) {
         return res.status(401).json({ message: 'email or password is invalid!' });
      }
   else {
      // compar entre mdp crypt
      bcrypt.compare(req.body.password , connectedUser.password,  (err, result) => {
   if (result){
      const data = {
         email: connectedUser.email,
         userId: connectedUser._id
      }
      const createToken = jwt.sign(data, 'secret', { expiresIn: "1d" });
      res.json({ message: 'login successfully!', token: createToken });
   }
   else {
      return res.status(400).json({
        message: "email or password is invalid!"
      });
    }
        
      }
      )};
});

///////////////////// log out //////////////////////////////////////

router.post ('/logout' , passport.authenticate('bearer', { session: false }) , async (req,res) => {
   req.logout();
   res.json({message :'logout successfully'})
})
module.exports = router;