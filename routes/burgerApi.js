const express = require("express");
const Burger = require("../models/burgerSchema");
const router = express.Router();
const path = require ('path');
const multer = require('multer');
const passport = require ('passport')

////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage: storage });

/////////////////////////////////////////

router.post("/burger", [ upload.single('imageBurger') , passport.authenticate('bearer', { session: false })]  , (req, res) => {
  req.body.imageBurger = req.file.filename
  const burger = new Burger(req.body);
  burger.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////////////////////////////

router.delete('/deleteBurger/:id', passport.authenticate('bearer', { session: false }),(req,res)=> {
    _id=req.params.id
    Burger.findByIdAndDelete(_id)
    .then (()=>{res.json({message : 'deleted , verifier data base'})})
    .catch (err => console.log("err"))
  })

////////////////////////////////////////

  router.put('/editBurger/:id' , [ upload.single('imageBurger') , passport.authenticate('bearer', { session: false })]  , (req,res)=> {
    if(req.file !== undefined)
    {
      req.body.imageBurger = req.file.filename
    }
    Burger.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.json(result)})
    .catch (err => console.log(err))
  })

  ///////// affect ingrediants to burger ///////

  router.put ('/affect/:idBurger/:idIngrediants' , passport.authenticate('bearer', { session: false }) ,  (req,res) =>{
    Burger.findByIdAndUpdate(req.params.idBurger , {$push:{ingrediants :  req.params.idIngrediants}})
    .then(result => {res.json(result)})
    .catch (err => console.log(err))
  
  })

  ///////////////// get all ///////////////////

router.get('/findAllBurgers', [ upload.single('imageBurger') , passport.authenticate('bearer', { session: false }) ] , (req,res)=>{
  Burger.find()
  .then(result => {res.json(result)})
  .catch (err => console.log(err))
})
  
//////////////////////////////////////////////////

module.exports = router;

