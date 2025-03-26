const express = require('express');
const router = express.Router();
const studentUser = require('../models/Faculty.js');
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var FetchUser = require("../middleware/FetchFaculty.js");

const JWT_SECRET = "studentSecret";


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


  const user = await studentUser.create({   // CREATE THE NEW USER IN TABLE
    studentID: req.body.studentID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    course: req.body.course,
    yearOfStudy: req.body.yearOfStudy,
    department: req.body.department,
    cgpa: req.body.cgpa,
    enrollmentYear: req.body.enrollmentYear,
    marks: req.body.marks                    
  })
   
  // res.json(req.body);

  const data = {       // CREATE A AUTH TOKEN FOR THE NEW USER
    user : {
      id : user.studentID
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
    const {studentID,password} = req.body;
    var user = await studentUser.findOne({studentID});
    if(!user){
      res.status(400).json({error : "User does not exists"});
    }
 
    var checkPass = await bcrypt.compare(password,user.password);
    if(!checkPass){
     res.status(400).json({error : "User does not exists"});
    }
    
    const data = {
     user : {
       id : user.studentID
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
     const user = await studentUser.findById(userId).select("-password");
     res.send(user)
  } catch (error) {
    console.log(error.message);
    res.send(500).json("Some Server Error occured");
  }
})

module.exports = router;

