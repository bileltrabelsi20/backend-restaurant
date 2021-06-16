const express = require("express");
const Sandwich = require("../models/sandwichSchema");
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

////////////////// add_sandwich ///////////////////////

router.post("/sandwich", [ upload.single('imageSandwich') , passport.authenticate('bearer', { session: false }) ] , (req, res) => {
  req.body.imageSandwich = req.file.filename
  const sandwich = new Sandwich(req.body);
  sandwich.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////// delete_sandwich ////////////////////

router.delete('/deleteSandwich/:id' , passport.authenticate('bearer', { session: false }),(req,res)=> {
    _id=req.params.id
    Sandwich.findByIdAndDelete(_id)
    .then (()=>{res.json({message : 'deleted , verifier data base'})})
    .catch (err => console.log("err"))
  })

//////////////// edit_sandwich ///////////////////////

  router.put('/editSandwich/:id' , [ passport.authenticate('bearer', { session: false }) , upload.single('imageSandwich')] , (req,res)=> {
    if(req.file !== undefined)
    {
     req.body.imageSandwich = req.file.filename
    } 
    Sandwich.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.json({message : 'updated , verifier data base'})})
    .catch (err => console.log(err))
  })

//////////////////////////////////////////////////////

router.put ('/affect/:idSandwich/:idIngrediants' , passport.authenticate('bearer', { session: false }) , (req,res) =>{
  Sandwich.findByIdAndUpdate(req.params.idSandwich , {$push:{ingrediants :  req.params.idIngrediants}})
  .then(result => {res.json(result)})
  .catch (err => console.log(err))

})

///////////////// get all ///////////////////

router.get('/findAllSandwichs' , [ upload.single('imageSandwich') , passport.authenticate('bearer', { session: false }) ] , (req,res)=>{
  Sandwich.find()
  .then(result => {res.json(result)})
  .catch (err => console.log(err))
})
  
module.exports = router;
