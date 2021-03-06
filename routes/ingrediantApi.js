const express = require("express");
const Ingrediant = require("../models/ingrediantsSchema");
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

router.post("/ingrediant", [ upload.single('imageIngrediant') ,  passport.authenticate('bearer', { session: false })] , (req, res) => {
  req.body.imageIngrediant = req.file.filename
  const ingrediant = new Ingrediant(req.body);
  ingrediant.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////////////////////////////////////

router.delete('/deleteIngrediant/:id', passport.authenticate('bearer', { session: false }) , (req,res)=> {
    _id=req.params.id
    Ingrediant.findByIdAndDelete(_id)
    .then (()=>{res.json({message : 'deleted , verifier data base'})})
    .catch (err => console.log("err"))
  })

//////////////////////////////////////////////

  router.put('/editIngrediant/:id' , [ upload.single('imageIngrediant') , passport.authenticate('bearer', { session: false })] , (req,res)=> {
    if(req.file !== undefined)
    {
     req.body.imageIngrediant = req.file.filename
    }   
     Ingrediant.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.json(result)})
    .catch (err => console.log(err))
  })

///////////////// get all ///////////////////

router.get('/findAllIngrediants' , [ upload.single('imageIngrediant') , passport.authenticate('bearer', { session: false }) ] , (req,res)=>{
  Ingrediant.find()
  .then(result => {res.json(result)})
  .catch (err => console.log(err))
})
module.exports = router;
