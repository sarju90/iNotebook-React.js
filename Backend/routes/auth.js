
const express = require('express');
const User= require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')


a='sarju@90Dasjfjdjfd'
router.post('/createuser',[
    body('name','Enter a valid name ').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter password with minimum lenght 5').isLength({ min: 5 }),

], async(req,res)=>{

  let success=false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user=await User.findOne({email:req.body.email});
   if(user){
   return  res.status(400).json({success,error:"User with this email already exists"});
   }

   
    const salt = await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);
      user= await User.create({
        name: req.body.name,
        email:req.body.email,
       password:secPass,
      })
      
      const data={
        user:{
          id:user.id,
        }
      }
     const jwtTokan= jwt.sign(data,a)
    success=true;
    res.json({success,jwtTokan});
    } catch (error) {
      console.error(error.message)
      return  res.status(500).json(success,{error:"Internal server error accured"});
    }


})

router.post('/login',[
  
  body('email','Enter a valid Email').isEmail(),
  body('password','password not be blank').exists(),

], async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email,password}= req.body;

  try {
    let user=await User.findOne({email});
 if(!user){
 return  res.status(400).json({error:"User with this email not exists"});


 }

 const passcompare= await bcrypt.compare(password,user.password);
 if(!passcompare){
  success=false;
  return  res.status(400).json({success,error:"wrong password"});
 }

 const data={
  user:{
    id:user.id,
  }
}
const jwtTokan= jwt.sign(data,a)
success=true;
res.json({success,jwtTokan});


  } catch (error) {
    console.error(error.message)
    return  res.status(500).json({error:"Internal server error accured"});
  }
})

//ROUTE 3:USER DETAILS
router.post('/userdata',fetchuser, async(req,res)=>{

  try {
    userId=req.user.id;
   const user=await User.findById(userId).select("-password")
   res.send(user);
 
 }
 
  catch (error) {
    console.error(error.message)
    return  res.status(500).json({error:"Internal server error accured"});
  }


})


module.exports= router