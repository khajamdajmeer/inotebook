const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Schema = require('mongoose')
const {  validationResult,body } = require('express-validator');


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
 
 user = await User.create({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
 })
//  .then(user=>res.json(user)).catch(err=>console.log(err))
res.json({"Stutus":"sucess"})}
catch(error){
    console.error(error.message);
    
}

})
module.exports = router;