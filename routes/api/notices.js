const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const auth = require('../../middleware/auth');
const Notice = require('../../models/Notice');

// Multer for upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../../client/public/uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage});


// @route    GET api/notices
// @desc     Get all notices
// @access   Private
router.get('/', async(req,res) => {
    try {
        const notices = await Notice.find();
        res.send(notices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/notices
// @desc     Post a notice
// @access   Private
router.post('/', auth, upload.single('document'), [
    check('title' , 'Specify your name').not().isEmpty()
    ], async(req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const { title, document } = req.body;

        try{
            const notice = new Notice({
                title,
                document
            });

            await notice.save();
            res.send(notice);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});


// @route    DELETE api/notices/:id
// @desc     Delete notice
// @access   Private
router.delete('/:id', auth, async(req,res) => {
    try {
        const id = ObjectId(req.params['id']); // convert to ObjectId
        const notice = await Notice.findById({ _id: id });
        if(!notice) return res.status(400).json({ errors: [{msg: 'Notice not found'}]});

        await Notice.findByIdAndDelete({ _id: id});
        res.send('Notice deleted!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
