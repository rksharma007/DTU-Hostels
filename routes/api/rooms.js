const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const auth = require('../../middleware/auth');
const authStudent = require('../../middleware/authStudent');

const Hostel = require('../../models/Hostel');
const Room = require('../../models/Room');
const Application = require('../../models/Application');
const Student = require('../../models/Student');


// @route    POST api/rooms/add
// @desc     Register Rooms
// @access   Private
router.post('/add', auth, [
    check('roomno' , 'Specify room no.').not().isEmpty(),
    check('floor', 'Specify floor no.').not().isEmpty(),
    check('beds', 'Specify no. of beds').not().isEmpty(),
    check('acstatus', 'Specify AC/Non-AC room').not().isEmpty(),
    check('hostel_id', 'Enter Hostel Id').not().isEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {roomno, floor, beds, acstatus, hostel_id} = req.body;

        try{
            const id = ObjectId(hostel_id); // convert to ObjectId
            const hostel = await Hostel.findById({ _id: id });
            
            if(!hostel) return res.status(400).json({ errors: [{msg: 'Hostel not found'}]});
            const hostelid = hostel._id;

            let room = await Room.findOne({ hostelid: hostelid , roomno: roomno });
            if(room){
                return res.status(400).json({ errors: [{msg: 'This room number already exists in this hostel'}]});
            }

            room = new Room({
                hostelid,
                roomno,
                floor,
                beds,
                acstatus
            });

            await room.save();
            res.send(room);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


// @route    POST api/rooms/:hostel_id
// @desc     Register Rooms
// @access   Private
router.post('/:hostel_id', auth, [
    check('roomno' , 'Specify room no.').not().isEmpty(),
    check('floor', 'Specify floor no.').not().isEmpty(),
    check('beds', 'Specify no. of beds').not().isEmpty(),
    check('acstatus', 'Specify AC/Non-AC room').not().isEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {roomno, floor, beds, acstatus} = req.body;

        try{
            const id = ObjectId(req.params['hostel_id']); // convert to ObjectId
            const hostel = await Hostel.findById({ _id: id });
            
            if(!hostel) return res.status(400).json({ errors: [{msg: 'Hostel not found'}]});
            const hostelid = hostel._id;

            let room = await Room.findOne({ hostelid, roomno });
            if(room){
                return res.status(400).json({ errors: [{msg: 'This room number already exists in this hostel'}]});
            }

            room = new Room({
                hostelid,
                roomno,
                floor,
                beds,
                acstatus
            });

            await room.save();
            res.send(room);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    GET api/rooms
// @desc     Get all Rooms
// @access   Private
router.get('/', auth, async (req,res) => {
        
        try {
            const rooms = await Room.find();
            res.send(rooms);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/rooms/roomid
// @desc     Get room by id
// @access   Private
router.get('/me', authStudent, async (req,res) => {
    try {
        const student = await Student.findOne({ _id: req.userId });
        const roomid = student.roomid;
        const room = await Room.find({ _id: roomid });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        res.send(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route    GET api/rooms/:hostel_id/
// @desc     Get Rooms by Hostel_id
// @access   Private
router.get('/:hostel_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['hostel_id']); // convert to ObjectId
        const hostel = await Hostel.findOne({ _id: id });
        if(!hostel) return res.status(400).json({ errors: [{msg: 'Hostel not found'}]});
        const hostelid = hostel._id;

        const rooms = await Room.find({ hostelid });
        res.send(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/rooms/:room_id/
// @desc     Delete Rooms
// @access   Private
router.delete('/:room_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['room_id']); // convert to ObjectId
        const room = await Room.findOne({ _id: id });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        if(room.studentcount !== 0) return res.status(400).json({ errors: [{msg: 'Room has students, remove them first' }]});

        await Room.findByIdAndDelete({ _id: id });
        res.json({ msg: 'Room deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/rooms/remove/:room_id/:student_id
// @desc     Remove one student from room
// @access   Private
router.put('/remove/:room_id/:student_id', auth, async (req,res) => {
    try {
        const roomid = ObjectId(req.params['room_id']); // convert to ObjectId
        const room = await Room.findById({ _id: roomid });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        if(room.studentcount === 0) return res.status(400).json({ errors: [{msg: 'Room has no student'}]});

        const stuid = ObjectId(req.params['student_id']); // convert to ObjectId
        const student = await Student.findById({ _id: stuid });
        if(!student) return res.status(400).json({ errors: [{msg: 'Student not found'}]});

        const application = await Application.findOne({ studentid: stuid });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        if((room.studentid1 !== null) && (room.studentid1.toString() === stuid.toString())){
            room.studentid1 = null;
        }
        else if((room.studentid2 !== null) && (room.studentid2.toString() === stuid.toString())){
            room.studentid2 = null;
        }
        else if((room.studentid3 !== null) && (room.studentid3.toString() === stuid.toString())){
            room.studentid3 = null;
        }
        else{
            return res.status(400).json({ errors: [{msg: 'Student not found in this room'}]});
        }

        application.status = "verified";
        student.applicationstatus = 4;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
        student.roomid = null;
        room.vacant = true;
        room.studentcount = room.studentcount-1;

        await room.save();
        await student.save();
        await application.save();

        res.send(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;