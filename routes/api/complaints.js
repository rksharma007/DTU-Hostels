const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const ObjectId = require('mongodb').ObjectId;

// Import authentication validators
const auth = require('../../middleware/auth');
const authStudent = require('../../middleware/authStudent');

const Complaint = require('../../models/Complaint');
const Student = require('../../models/Student');


// @route    GET api/complaints
// @desc     Get all complaints
// @access   Private
router.get('/', auth, async(req,res) => {
    try {
        const complaints = await Complaint.find();
        res.send(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/complaints/me
// @desc     Get current student's complaints
// @access   Private
router.get('/me', authStudent, async(req,res) => {
    try {
        const stuid = ObjectId(req.userId); // convert to ObjectId
        const complaints = await Complaint.find({ studentid : stuid });
        res.send(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/complaints
// @desc     Post a complaint
// @access   Private
router.post('/', authStudent, [
    check('text', 'Complaint body cannot be empty').not().isEmpty(),
    ], async(req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const { text } = req.body;

        try{
            const studentid = ObjectId(req.userId);
            const student = await Student.findById({_id : studentid});
            const name = student.name;
            const roll = student.roll;

            const complaint = new Complaint({
                name,
                roll,
                text,
                studentid
            });

            await complaint.save();
            res.send(complaint);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});


// @route    PUT api/complaints/update/:id
// @desc     Mark complaint as resolved / unresolved
// @access   Private
router.put('/update/:id', auth, async(req,res) => {
    
    try {
        const id = ObjectId(req.params['id']); // convert to ObjectId
        const complaint = await Complaint.findById({ _id: id });
        if(!complaint) return res.status(400).json({ errors: [{msg: 'Complaint not found'}]});

        complaint.resolved = !complaint.resolved;

        await complaint.save();
        res.send(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    DELETE api/complaints/:id
// @desc     Delete complaint
// @access   Private
router.delete('/:id', authStudent, async(req,res) => {
    try {
        const id = ObjectId(req.params['id']); // convert to ObjectId
        const complaint = await Complaint.findById({ _id: id });
        if(!complaint) return res.status(400).json({ errors: [{msg: 'Complaint not found'}]});

        await Complaint.findByIdAndDelete({ _id: id});
        res.send('Complaint deleted!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;