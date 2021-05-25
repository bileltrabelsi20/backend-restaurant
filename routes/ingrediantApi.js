const express = require("express");
const Ingrediant = require("../models/ingrediantsSchema");
const router = express.Router();
const path = require ('path');
const multer = require('multer');

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

router.post("/ingrediant",upload.single('imageIngrediant') , (req, res) => {

  req.body.imageIngrediant = req.file.filename
  const ingrediant = new Ingrediant(req.body);
  ingrediant.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////////////////////////////////////

router.delete('/deleteIngrediant/:id',(req,res)=> {
    _id=req.params.id
    Ingrediant.findByIdAndDelete(_id)
    .then (()=>{res.send('deleted , verifier data base')})
    .catch (err => console.log("err"))
  })

//////////////////////////////////////////////

  router.put('/editIngrediant/:id' , upload.single('imageIngrediant') , (req,res)=> {

    req.body.imageIngrediant = req.file.filename
    Ingrediant.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.send(result)})
    .catch (err => console.log(err))
  })

////////////////////////////////////////////////

module.exports = router;
