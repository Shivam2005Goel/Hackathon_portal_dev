const express = require('express');
const router = express.Router();
const facultyUser = require('../models/Faculty.js');
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var FetchUser = require("../middleware/FetchFaculty.js");

const JWT_SECRET = "facultySecret";


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


  const user = await facultyUser.create({   // CREATE THE NEW USER IN TABLE
    facultyID: req.body.facultyId,
    name: req.body.name,                    
    email: req.body.email,    
    password: req.body.password,          
    phoneNumber:  req.body.phoneNumber,                           
    department:  req.body.department,                                   
  })
   
  // res.json(req.body);

  const data = {       // CREATE A AUTH TOKEN FOR THE NEW USER
    user : {
      id : user.facultyId
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
    const {facultyID,password} = req.body;
    var user = await facultyUser.findOne({facultyID});
    if(!user){
      res.status(400).json({error : "User does not exists"});
    }
 
    var checkPass = await bcrypt.compare(password,user.password);
    if(!checkPass){
     res.status(400).json({error : "User does not exists"});
    }
    
    const data = {
     user : {
       id : user.facultyID
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
     const user = await facultyUser.findById(userId).select("-password");
     res.send(user)
  } catch (error) {
    console.log(error.message);
    res.send(500).json("Some Server Error occured");
  }
})

module.exports = router;

