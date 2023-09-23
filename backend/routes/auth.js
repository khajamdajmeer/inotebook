const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Schema = require('mongoose')
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ajmeerhere';
const fetchuser = require('../middleware/fetchUser')



//createing a validating varibles for input:,
// const validateStrongPassword = body("password", 'password must be of 8 character with a symbol ,number & a Capital letter').isString().isLength({ min: 8 })
//     .not().isLowercase().not().isUppercase()
//     .not().isNumeric().not().isAlpha();
const validateStrongPassword = body("password", 'password must be of 8 character with a symbol ,number & a Capital letter').isString().isLength({min:4});
const validateName = body('name', 'enter a valid Name').isLength({ min: 3, max: 15 });
const validateEmail = body('email', 'enter a valid Email').isEmail();





//Route1: Create a User using: POST "/api/auth/" . Doesn't require Auth
router.post('/createuser', [validateName, validateEmail, validateStrongPassword], async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        let msgerror = errors.array();
        return res.status(400).json({success:success, errors: msgerror });
    }

    try {
        //check wether the email is already used for a account
        let user = await User.findOne({ email: req.body.email });
        if (user) { return res.status(400).json({success:success, error: 'Sorry Email already exists' }) }
        var salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a New User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, JWT_SECRET);

        res.json({success:true, AuthToken })
    }
    catch (error) {
        console.error(error.message);

    }

}

)

//Route 2:authenticate user using post '/api/auth/login
router.post('/login', [validateEmail, body('password', 'password cannot be blank').exists()], async (req, res) => {
    //if therer are errors return Bad request and the errors 
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: 'please use correct credentials' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false
            return res.status(400).json({ success,errors: 'please use correct credentials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, JWT_SECRET);
success= true;
        res.json({ success,AuthToken })
        return success;
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal error Occoured')
    }

});


//ROUTE 3 : get loggedin deatails using : POST "/apo/auth/getuser".Login required
router.post('/getuser', fetchuser, async (req, res) => {
    //if there are errors return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal error Occoured')
    }
});

module.exports = router;