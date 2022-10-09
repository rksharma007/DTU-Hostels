const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const ObjectId = require('mongodb').ObjectId;

// Import authentication validators
const auth = require('../../middleware/auth');
const authStudent = require('../../middleware/authStudent');

// Import models
const Application = require('../../models/Application');
const Student = require('../../models/Student');
const Room = require('../../models/Room');


// @route    POST api/application
// @desc     Apply for hostel
// @access   Private
router.post('/apply', authStudent, [
    check('fullname' , 'Specify name').not().isEmpty(),
    check('gender', 'Specify gender').not().isEmpty(),
    check('roll', 'Specify roll number').not().isEmpty(),
    check('branch', 'Specify branch').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('semester', 'Specify applying for which semester').not().isEmpty(),
    check('mobile', 'Enter valid mobile number').isMobilePhone(),
    check('gradyear', 'Specify graduation year').not().isEmpty(),
    check('fathername', 'Specify fathers name').not().isEmpty(),
    check('fathermobile', 'Specify fathers mobile').not().isEmpty(),
    check('mothername', 'Specify mothers name').not().isEmpty(),
    check('mothermobile', 'Specify mothers mobile').not().isEmpty(),
    check('localguardianname', 'Specify local guardian name').not().isEmpty(),
    check('localguardianmobile', 'Specify local guardian mobile').not().isEmpty(),
    check('nationality', 'Specify nationality').not().isEmpty(),
    check('permanentaddress_country', 'Specify country of permanent address').not().isEmpty(),
    check('permanentaddress_state', 'Specify state of permanent address').not().isEmpty(),
    check('permanentaddress_city', 'Specify city of permanent address').not().isEmpty(),
    check('permanentaddress_addressline1', 'Specify address line 1 of permanent address').not().isEmpty(),
    check('permanentaddress_addressline2', 'Specify address line 2 of permanent address').not().isEmpty(),
    check('correspondenceaddress_country', 'Specify country of correspondence address').not().isEmpty(),
    check('correspondenceaddress_state', 'Specify state of correspondence address').not().isEmpty(),
    check('correspondenceaddress_city', 'Specify city of correspondence address').not().isEmpty(),
    check('correspondenceaddress_addressline1', 'Specify address line 1 of correspondence address').not().isEmpty(),
    check('correspondenceaddress_addressline2', 'Specify address line 2 of correspondence address').not().isEmpty()
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {
            fullname,
            gender,
            roll,
            branch,
            semester,
            email,
            mobile,
            gradyear,
            fathername,
            fathermobile,
            mothername,
            mothermobile,
            localguardianname,
            localguardianmobile,
            nationality,
            permanentaddress_country,
            permanentaddress_state,
            permanentaddress_city,
            permanentaddress_addressline1,
            permanentaddress_addressline2,
            correspondenceaddress_country,
            correspondenceaddress_state,
            correspondenceaddress_city,
            correspondenceaddress_addressline1,
            correspondenceaddress_addressline2
        } = req.body;

        try{
            const id = ObjectId(req.userId); // convert to ObjectId
            const student = await Student.findById({ _id: id });
            const studentid = student._id;
            //console.log(student);
            if(student.applicationstatus === 1) return res.status(400).json({ errors: [{msg: 'Already applied, delete it to apply new'}]});
            if(student.applicationstatus === 2) return res.status(400).json({ errors: [{msg: 'Application rejected, delete it to apply new'}]});
            if(student.applicationstatus === 3) return res.status(400).json({ errors: [{msg: 'Application approved, delete it if you want to apply new'}]});
            if(student.applicationstatus === 4) return res.status(400).json({ errors: [{msg: 'Application approved and docs are verified'}]});
            if(student.applicationstatus === 5) return res.status(400).json({ errors: [{msg: 'Room already allotted to student'}]});

            const application = new Application({
                studentid,
                fullname,
                gender,
                roll,
                branch,
                semester,
                email,
                mobile,
                gradyear,
                fathername,
                fathermobile,
                mothername,
                mothermobile,
                localguardianname,
                localguardianmobile,
                nationality,
                permanentaddress_country,
                permanentaddress_state,
                permanentaddress_city,
                permanentaddress_addressline1,
                permanentaddress_addressline2,
                correspondenceaddress_country,
                correspondenceaddress_state,
                correspondenceaddress_city,
                correspondenceaddress_addressline1,
                correspondenceaddress_addressline2
            });

            student.applicationstatus = 1;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            await application.save();
            await student.save();
            res.send(application);
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    GET api/application
// @desc     Get all Applications
// @access   Private
router.get('/', auth, async(req,res) => {
        
    try {
        const applications = await Application.find();
        res.send(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    GET api/application/me
// @desc     Get current student's application
// @access   Private
router.get('/me', authStudent, async (req,res) => {
    try {
        const application = await Application.find({ studentid: req.userId });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});
        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    GET api/application/:application_id
// @desc     Get application by application_id
// @access   Private
router.get('/:application_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});
        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    GET api/application/:mobileno
// @desc     Get application by mobile number
// @access   Private
router.get('/mobile/:mobileno', auth, async (req,res) => {
    try {
        const mobilenumber = req.params.mobileno.toString();
        const application = await Application.findOne({ mobile: mobilenumber });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});
        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/application/reject/:application_id
// @desc     Reject Application
// @access   Private
router.put('/reject/:application_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });

        application.status = "rejected";
        student.applicationstatus = 2;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted

        await student.save();
        await application.save();

        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/application/approve/:application_id
// @desc     Approve Application
// @access   Private
router.put('/approve/:application_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });

        if(application.status === "approved") return res.status(400).json({ errors: [{msg: 'Application already approved'}]});
        if(application.status === "verified") return res.status(400).json({ errors: [{msg: 'Application already approved and docs verified'}]});
        if(application.status === "allotted") return res.status(400).json({ errors: [{msg: 'Application already approved, verified & room allotted'}]});

        application.status = "approved";
        student.applicationstatus = 3;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted

        await student.save();
        await application.save();

        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/application/verify/:application_id
// @desc     Verify Docs
// @access   Private
router.put('/verify/:application_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });

        if(application.status === "applied") return res.status(400).json({ errors: [{msg: 'Application not approved yet'}]});
        if(application.status === "rejected") return res.status(400).json({ errors: [{msg: 'Application not approved yet'}]});
        if(application.status === "verified") return res.status(400).json({ errors: [{msg: 'Application already verified'}]});
        if(application.status === "allotted") return res.status(400).json({ errors: [{msg: 'Application already verified and room allotted'}]});

        application.status = "verified";
        student.applicationstatus = 4;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted

        await student.save();
        await application.save();

        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/application/allot/:application_id/:room_id
// @desc     Allot rooms
// @access   Private
router.put('/allot', auth, [
    check('application_id' , 'Specify applicatoin id').not().isEmpty(),
    check('roomId', 'Specify room id').not().isEmpty()
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {application_id, roomId} = req.body;

        const app_id = ObjectId(application_id); // convert to ObjectId
        const application = await Application.findById({ _id: app_id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});
        if(application.status === "applied") return res.status(400).json({ errors: [{msg: 'Application not approved yet'}]});
        if(application.status === "rejected") return res.status(400).json({ errors: [{msg: 'Application not approved yet'}]});
        if(application.status === "approved") return res.status(400).json({ errors: [{msg: 'Application not verified yet'}]});
        if(application.status === "allotted") return res.status(400).json({ errors: [{msg: 'Application already verified and room allotted'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });
        if(student.applicationstatus === 5) return res.status(400).json({ errors: [{msg: 'Student is already allotted a room'}]});

        const roomid = ObjectId(roomId); // convert to ObjectId
        const room = await Room.findById({ _id: roomid });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        if(!room.vacant) return res.status(400).json({ errors: [{msg: 'Room not vacant'}]});
        if(room.studentcount === room.beds) return res.status(400).json({ errors: [{msg: 'Room is full'}]});

        if(room.studentcount < room.beds){

            if(room.studentid1 === null){
                room.studentid1 = stuid;
                student.roomid = roomid;
                room.studentcount = room.studentcount+1;
            }
            else if(room.studentid2 === null){
                room.studentid2 = stuid;
                student.roomid = roomid;
                room.studentcount = room.studentcount+1;
            }
            else if(room.studentid3 === null){
                room.studentid3 = stuid;
                student.roomid = roomid;
                room.studentcount = room.studentcount+1;
            }

        }
        
        if(room.studentcount === room.beds) room.vacant = false;
        else room.vacant = true;

        application.status = "allotted";
        student.applicationstatus = 5;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted

        await room.save();
        await student.save();
        await application.save();

        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/application/unallot/:application_id
// @desc     Un-allot
// @access   Private
router.put('/unallot/:application_id', auth, async (req,res) => {
    try {
        const appid = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: appid });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const student = await Student.findById({ _id: application.studentid });
        if(!student) return res.status(400).json({ errors: [{msg: 'Student not found'}]});
        const stuid = student._id;

        const room = await Room.findById({ _id: student.roomid });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        if(room.studentcount === 0) return res.status(400).json({ errors: [{msg: 'Room has no student'}]});

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
        student.feestatus = false;
        room.vacant = true;
        room.studentcount = room.studentcount-1;

        await room.save();
        await student.save();
        await application.save();

        res.send(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/application/remove/:room_id
// @desc     Remove all students from room
// @access   Private
router.put('/remove/:room_id', auth, async (req,res) => {
    try {
        const roomid = ObjectId(req.params['room_id']); // convert to ObjectId
        const room = await Room.findById({ _id: roomid });
        if(!room) return res.status(400).json({ errors: [{msg: 'Room not found'}]});
        if(room.studentcount === 0) return res.status(400).json({ errors: [{msg: 'Room has no student'}]});

        if(room.studentid1 !== null){
            const stuid1 = room.studentid1;
            const student1 = await Student.findById({ _id: stuid1 });
            if(!student1) return res.status(400).json({ errors: [{msg: 'Student not found'}]});
            const application1 = await Application.findOne({ studentid: stuid1 });
            if(!application1) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

            application1.status = "verified";
            student1.applicationstatus = 4;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            student1.allotted = false;
            student1.roomid = null;
            room.studentid1 = null;

            await student1.save();
            await application1.save();
        }
        if(room.studentid2 !== null){
            const stuid2 = room.studentid2;
            const student2 = await Student.findById({ _id: stuid2 });
            if(!student2) return res.status(400).json({ errors: [{msg: 'Student not found'}]});
            const application2 = await Application.findOne({ studentid: stuid2 });
            if(!application2) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

            application2.status = "verified";
            student2.applicationstatus = 4;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            student2.allotted = false;
            student2.roomid = null;
            room.studentid2 = null;

            await student2.save();
            await application2.save();
        }
        if(room.studentid3 !== null){
            const stuid3 = room.studentid3;
            const student3 = await Student.findById({ _id: stuid3 });
            if(!student3) return res.status(400).json({ errors: [{msg: 'Student not found'}]});
            const application3 = await Application.findOne({ studentid: stuid3 });
            if(!application3) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

            application3.status = "verified";
            student3.applicationstatus = 4;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            student3.allotted = false;
            student3.roomid = null;
            room.studentid3 = null;

            await student3.save();
            await application3.save();
        }

        room.vacant = true;
        room.studentcount = 0;

        await room.save();
        res.send(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/application/change/:room_id/:room2_id/:student_id
// @desc     Change room of student
// @access   Private
router.put('/change/:room1_id/:room2_id/:student_id', auth, async (req,res) => {
    try {
        // Check if room1 and room2 are same
        if(req.params['room1_id'] === req.params['room2_id']) return res.status(400).json({ errors: [{ msg: 'Room ids are same'}]});

        // Check if room 1 exists
        const room1id = ObjectId(req.params['room1_id']); // convert to ObjectId
        const room1 = await Room.findById({ _id: room1id });
        if(!room1) return res.status(400).json({ errors: [{msg: 'Room1 not found'}]});
        if(room1.studentcount === 0) return res.status(400).json({ errors: [{msg: 'Room1 has no student'}]});

        // Check if room 2 exists
        const room2id = ObjectId(req.params['room2_id']); // convert to ObjectId
        const room2 = await Room.findById({ _id: room2id });
        if(!room2) return res.status(400).json({ errors: [{msg: 'Room2 not found'}]});
        if(room2.vacant === false) return res.status(400).json({ errors: [{msg: 'Room2 is not vacant'}]});
        if(room2.studentcount === room2.beds) return res.status(400).json({ errors: [{msg: 'Room2 is full'}]});

        // Check if student exists
        const stuid = ObjectId(req.params['student_id']); // convert to ObjectId
        const student = await Student.findById({ _id: stuid });
        if(!student) return res.status(400).json({ errors: [{msg: 'Student not found'}]});
        if(student.applicationstatus !== 5) return res.status(400).json({ errors: [{msg: 'Application is not approved yet'}]});

        // Check and update room 1 status
        if((room1.studentid1 !== null) && (room1.studentid1.toString() === stuid.toString())){
            room1.studentid1 = null;
        }
        else if((room1.studentid2 !== null) && (room1.studentid2.toString() === stuid.toString())){
            room1.studentid2 = null;
        }
        else if((room1.studentid3 !== null) && (room1.studentid3.toString() === stuid.toString())){
            room1.studentid3 = null;
        }
        else{
            return res.status(400).json({ errors: [{msg: 'Student not found in room1'}]});
        }
        room1.vacant = true;
        room1.studentcount = room1.studentcount-1;
        await room1.save();

        // Check and update room 2 status
        if(room2.studentcount < room2.beds){
            if(room2.studentid1 === null){
                room2.studentid1 = stuid;
                student.roomid = room2id;
                room2.studentcount = room2.studentcount+1;
            }
            else if(room2.studentid2 === null){
                room2.studentid2 = stuid;
                student.roomid = room2id;
                room2.studentcount = room2.studentcount+1;
            }
            else if(room2.studentid3 === null){
                room2.studentid3 = stuid;
                student.roomid = room2id;
                room2.studentcount = room2.studentcount+1;
            }
        }
        
        if(room2.studentcount === room2.beds) room2.vacant = false;
        else room2.vacant = true;

        await room2.save();
        await student.save();

        res.send(room2);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    DELETE api/application/:application_id/
// @desc     Delete Application
// @access   Private
router.delete('/:application_id', auth, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });
        if(!student) return res.status(400).json({ errors: [{ msg: 'Student not found' }]});

        if(student.applicationstatus !== 5){
            student.applicationstatus = 0; // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            await student.save();
        }
        else{
            const roomid = student.roomid;
            const room = await Room.findById({ _id: roomid });

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

            student.applicationstatus = 0;  // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
            student.roomid = null;
            room.vacant = true;
            room.studentcount = room.studentcount-1;

            await room.save();
            await student.save();
        }

        await Application.findByIdAndDelete({ _id: id });
        res.json({ msg: 'Application deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/application/delByStudent/:application_id/
// @desc     Delete Application by student before verification stage
// @access   Private
router.delete('/delByStudent/:application_id', authStudent, async (req,res) => {
    try {
        const id = ObjectId(req.params['application_id']); // convert to ObjectId
        const application = await Application.findById({ _id: id });
        if(!application) return res.status(400).json({ errors: [{msg: 'Application not found'}]});

        const stuid = application.studentid;
        const student = await Student.findById({ _id: stuid });
        if(!student) return res.status(400).json({ errors: [{ msg: 'Student not found' }]});

        if(student.applicationstatus === 5 || student.applicationstatus === 4){
            return res.status(400).json({ errors: [{ msg: 'Application has crossed the verification stage and can only be deleted by the admin' }]});
        }
        
        student.applicationstatus = 0; // 0 means not applied, 1 means applied, 2 means rejected, 3 means approved, 4 means docs verified, 5 means allotted
        await student.save();
        await Application.findByIdAndDelete({ _id: id });
        res.json({ msg: 'Application deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;