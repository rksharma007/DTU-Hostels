const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult }= require('express-validator');

// Bring admin model
const Admin = require('../../models/Admin');
const { JsonWebTokenError } = require('jsonwebtoken');

// Bring auth token
const authAdmin = require('../../middleware/auth')


// @route    POST api/admin/register
// @desc     Register Admin
// @access   Public
router.post('/register', [
    check('name' , 'Name is required!').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be minimum 8 characters long').isLength({min: 8})
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {name, roll, email, password} = req.body;

        try{
            let admin = await Admin.findOne({ email });;
            // See if the admin exists
            if(admin){
                return res.status(400).json({ errors: [{msg: 'Admin with this email already exists'}]});
            }

            admin = new Admin({
                name,
                roll,
                email,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
            await admin.save();

            // Return jsonwebtoken
            const payload = {
                admin:{
                    id : admin.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecretAdmin'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


// @route    POST api/admin/login
// @desc     Authenticate admin & get token
// @access   Public
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required!').exists(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const { email, password } = req.body;

        try{
            let admin = await Admin.findOne({ email });
            // See if the admin exists
            if(!admin){
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if(!isMatch){
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials!' }] });
            }
            
            const payload = {
                admin:{
                    id : admin.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecretAdmin'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    GET api/admin/me
// @desc     Get logged in admin
// @access   Private
router.get('/me', authAdmin, async (req,res) => {
    try {
        const admin = await Admin.findOne({ _id: req.userId });
        res.send(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;