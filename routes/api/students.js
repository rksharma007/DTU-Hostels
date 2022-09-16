const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult }= require('express-validator');

// Bring student model
const Student = require('../../models/Student');
const { JsonWebTokenError } = require('jsonwebtoken');

// Bring auth token
const authAdmin = require('../../middleware/auth')
const authStudent = require('../../middleware/authStudent');

// @route    POST api/students/register
// @desc     Register Students
// @access   Public
router.post('/register', [
    check('name' , 'Name is required!').not().isEmpty(),
    check('roll' , 'Roll is required!').not().isEmpty(),
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
            let student = await Student.findOne({ email });;
            // See if the student exists
            if(student){
                return res.status(400).json({ errors: [{msg: 'Student with this email already exists'}]});
            }
            student = await Student.findOne({ roll });;
            if(student){
                return res.status(400).json({ errors: [{msg: 'Student with this roll already exists'}]});
            }

            student = new Student({
                name,
                roll,
                email,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(password, salt);
            await student.save();

            // Return jsonwebtoken
            const payload = {
                student:{
                    id : student.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecretStudent'),
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


// @route    POST api/students/login
// @desc     Authenticate Student & get token (Login)
// @access   Public
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required!').exists(),
    check('roll', 'Roll is required!').exists()
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const { email, password, roll } = req.body;

        try{
            let student = await Student.findOne({ email, roll });
            // See if the student exists
            if(!student){
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, student.password);
            if(!isMatch){
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials!' }] });
            }
            
            const payload = {
                student:{
                    id : student.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecretStudent'),
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


// @route    GET api/students
// @desc     Get all students
// @access   Private
router.get('/', authAdmin, async (req,res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/students/me
// @desc     Get logged in student
// @access   Private
router.get('/me', authStudent, async (req,res) => {
    try {
        const students = await Student.findOne({ _id: req.userId });
        res.send(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;