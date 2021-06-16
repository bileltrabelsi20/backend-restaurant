const express = require("express");
const Tacos = require("../models/tacosSchema");
const router = express.Router();
const multer = require('multer');
const path = require ('path');
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

////////////////// tacos with image ///////////////////////

router.post("/tacos" , [ passport.authenticate('bearer', { session: false }) ,  upload.single('imageTacos')] , (req, res) => {
  req.body.imageTacos = req.file.filename
  const tacos = new Tacos(req.body);
  tacos.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////// delete tecos ////////////////////

router.delete('/deleteTacos/:id' , passport.authenticate('bearer', { session: false }) ,(req,res)=> {
    _id=req.params.id
    Tacos.findByIdAndDelete(_id)
    .then (()=>{res.json({message : 'deleted , verifier data base'})})
    .catch (err => console.log("err"))
  })

//////////////// edit_tacos ///////////////////////

  router.put('/editTacos/:id' , [ passport.authenticate('bearer', { session: false }) ,  upload.single('imageTacos') ] , (req,res)=> {
   if(req.file !== undefined)
   {
    req.body.imageTacos = req.file.filename
   }
    Tacos.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.json({message : 'updated , verifier data base'})})
    .catch (err => console.log(err))
  })

///////////////// effect ////////////////////////

router.put ('/tacos/:idTacos/:idIngrediants' , passport.authenticate('bearer', { session: false }) , (req,res) =>{
  Tacos.findByIdAndUpdate(req.params.idTacos , {$push:{ingrediants :  req.params.idIngrediants}})
  .then(result => {res.json(result)})
  .catch (err => console.log(err))

})

///////////////// get all ///////////////////

router.get('/findAllTacos', [ passport.authenticate('bearer', { session: false }) ,  upload.single('imageTacos')] ,(req,res)=>{
  Tacos.find()
  .then(result => {res.json(result)})
  .catch (err => console.log(err))
})
  
module.exports = router;
