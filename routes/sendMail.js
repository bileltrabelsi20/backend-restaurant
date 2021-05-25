var express = require('express');
const nodemailer = require('nodemailer');
const user = require('../models/userSchema');
var router =express.Router();

router.post ('/sendMail' , async  (req,res)=> {
   
    let transporter = nodemailer.createTransport({
      
      service: 'gmail', 
      auth: {
        user:'Point.B.restaurant@gmail.com', 
        pass: 'bileltrabelsi'
      },
    });
  
    let info = await transporter.sendMail({
      from: 'Point.B.restaurant@gmail.com', 
      to : req.body.email, 
      
      subject: "BIENVENUE !", 
      text: "" ,
       html : `bonjour ` + req.body.Name + ` votre compte vient d'être créé <br> simple click <br>  http://localhost:4200 `
       
    });

  res.json({message:"email envoyé"})
  
    })
  
  module.exports = router;