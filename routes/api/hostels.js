const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const auth = require('../../middleware/auth');
const Hostel = require('../../models/Hostel');
const Room = require('../../models/Room');
const ObjectId = require('mongodb').ObjectId;

// @route    POST api/hostels
// @desc     Register Hostels
// @access   Private
router.post('/', auth, [
    check('name' , 'Hostel name is required!').not().isEmpty(),
    check('wardenname' , 'Warden name is required!').not().isEmpty(),
    check('wardencontact', 'Warden contact is required').not().isEmpty(),
    check('gender', 'Specify boys/girls hostel').not().isEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {name, wardenname, wardencontact, gender} = req.body;

        try{
            let hostel = await Hostel.findOne({ name });;
            // See if the hostel exists
            if(hostel){
                return res.status(400).json({ errors: [{msg: 'Hostel with this name already exists'}]});
            }

            hostel = new Hostel({
                name,
                wardenname,
                wardencontact,
                gender
            });
            await hostel.save();
            res.send(hostel);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    GET api/hostels
// @desc     Get all hostels
// @access   Public
router.get('/', auth, async (req,res) => {
    try {
        const hostels = await Hostel.find().populate('name', ['gender', 'wardenname', 'wardencontact']);
        res.send(hostels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/hostels/:hostel_id/
// @desc     Delete hostel
// @access   Private
router.delete('/:hostel_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['hostel_id']); // convert to ObjectId
        const hostel = await Hostel.findOne({ _id: id });
        
        if(!hostel) return res.status(400).json({ errors: [{msg: 'Hostel not found'}]});
        const hostelid = hostel._id;
        
        // Delete hostel rooms first
        await Room.deleteMany({ hostelid });

        // Delete hostel
        await Hostel.findOneAndRemove({ _id: id });
        
        res.json({ msg: 'Hostel deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;