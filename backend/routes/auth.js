const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Schema = require('mongoose')
const {  validationResult,body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ajmeerhere';



//createing a validating varibles for input for name:,
const validateStrongPassword = body("password",'password must be of 8 character with a symbol ,number & a Capital letter').isString().isLength({ min: 8 })
.not().isLowercase().not().isUppercase()
.not().isNumeric().not().isAlpha();
const validateName = body('name','enter a valid Name').isLength({min:6,max:10});
const validateEmail = body('email','enter a valid Email').isEmail();





//Create a User using: POST "/api/auth/" . Doesn't require Auth
router.post('/createuser',[validateName,validateEmail,validateStrongPassword],async (req,res)=>{
 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
 }

 try {
    //check wether the email is already used for a account
 let user = await User.findOne({email:req.body.email});
 if(user)
     {return res.status(400).json({error:'Sorry Email already exists'})}
var salt = await bcrypt.genSaltSync(10);
const secPass = await bcrypt.hash(req.body.password,salt);

 //create a New User
 user = await User.create({
    name:req.body.name,
    password:secPass,
    email:req.body.email
 });
 const data = {
    user:{
        id:user.id
    }
 }
 const AuthToken = jwt.sign(data,JWT_SECRET);
 
//  .then(user=>res.json(user)).catch(err=>console.log(err))
res.json({AuthToken})}
catch(error){
    console.error(error.message);
    
}

})
module.exports = router;