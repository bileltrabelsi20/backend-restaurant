const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')

//////////////////////////// Register //////////////////////////////////

router.post('/register', async (req, res) => {
const addUser = await User.findOne({ email: req.body.email , Name : req.body.Name });

   if (addUser == null) {

      User.create(req.body).then( async(createdUser) => {
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

         res.json(createdUser)
      })

        .catch(error => {
         console.log(error);
         return res.json('email  exist!');

      });
      }
      });

/////////////////////////////////////// Login /////////////////////////////////////////////

router.post('/login', async (req, res) => {
const connectedUser = await User.findOne({ email: req.body.email, password: req.body.password });

   if (!connectedUser) {
         return res.json({ message: 'email or password is invalid!' });
      }

   else {
         const data = {
            email: connectedUser.email,
            userId: connectedUser._id
         }
         const createToken = jwt.sign(data, 'secret', { expiresIn: "1d" });
         return res.json({ message: 'login successfully!', token: createToken, connectedUser });

      }
   }
   );

module.exports = router;