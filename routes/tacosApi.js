const express = require("express");
const Tacos = require("../models/tacosSchema");
const router = express.Router();
const multer = require('multer');
const path = require ('path');

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

////////////////// add_sandwich with image ///////////////////////

router.post("/tacos",  upload.single('imageTacos') , (req, res) => {

  req.body.imageTacos = req.file.filename
  const tacos = new Tacos(req.body);
  tacos.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

////////////////// delete_sandwich ////////////////////

router.delete('/deleteTacos/:id',(req,res)=> {
    _id=req.params.id
    Tacos.findByIdAndDelete(_id)
    .then (()=>{res.send('deleted , verifier data base')})
    .catch (err => console.log("err"))
  })

//////////////// edit_sandwich ///////////////////////

  router.put('/editTacos/:id' ,  upload.single('imageTacos') , (req,res)=> {

    req.body.imageTacos = req.file.filename
    Tacos.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(result => {res.send(result)})
    .catch (err => console.log(err))
  })

///////////////// effect ////////////////////////

router.put ('/tacos/:idTacos/:idIngrediants' , (req,res) =>{

  Tacos.findByIdAndUpdate(req.params.idTacos , {$push:{ingrediants :  req.params.idIngrediants}})
  .then(result => {res.send(result)})
  .catch (err => console.log(err))

})

///////////////// get all ///////////////////

router.get('/findAllTacos',(req,res)=>{
  Tacos.find()
  .then(result => {res.send(result)})
  .catch (err => console.log(err))
})
  
module.exports = router;
