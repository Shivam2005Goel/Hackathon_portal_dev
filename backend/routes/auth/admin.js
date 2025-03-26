const express = require('express');
const router = express.Router();
const adminUser = require('../models/Admin.js');
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var FetchUser = require("../middleware/FetchAdmin.js");

const JWT_SECRET = "adminSecret";


router.post('/createUser',[
    body('name').notEmpty(),
    body("email").isEmail(),
], async (req,res)=>{
   const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  var salt = await bcrypt.genSalt(10);     // CREATE AND HASH PASSWORD
  var secPass = await bcrypt.hash(req.body.password,salt);


  const user = await adminUser.create({   // CREATE THE NEW USER IN TABLE
    adminID: req.body.adminID,   // Unique identifier for the admin
    name: req.body.name,                   // Last name
    email: req.body.email,     // Email address
    password: secPass,              // Hashed password for authentication
    phoneNumber: req.body.phoneNumber   
  })
   
  // res.json(req.body);

  const data = {       // CREATE A AUTH TOKEN FOR THE NEW USER
    user : {
      id : user.adminID
    }
  }
  var authToken = jwt.sign(data,JWT_SECRET);
  res.json({authToken});
  
})


router.post("/login",[
  body("email").isEmail(),
  body("password").exists()
],async (req,res)=>{
   var result = validationResult(req);
   if(!result.isEmpty()){
    res.status(400).json({error : "Plz enter the correct credentials"});
   }

   try {
    const {adminID,password} = req.body;
    var user = await adminUser.findOne({adminID});
    if(!user){
      res.status(400).json({error : "User does not exists"});
    }
 
    var checkPass = await bcrypt.compare(password,user.password);
    if(!checkPass){
     res.status(400).json({error : "User does not exists"});
    }
    
    const data = {
     user : {
       id : user.adminID
     }
   }
   var authToken = jwt.sign(data,JWT_SECRET);
   res.json({authToken});
   } catch (error) {
      console.log(error.message);
      res.send(500).json("Some Server Error occured");
   }
   

})

router.post('/getUser',FetchUser,async (req,res)=>{
  try {
     const userId = req.user.id;
     const user = await adminUser.findById(userId).select("-password");
     res.send(user)
  } catch (error) {
    console.log(error.message);
    res.send(500).json("Some Server Error occured");
  }
})

module.exports = router;

