const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Notice = require('../../models/Notice');
const auth = require('../../middleware/auth');
const ObjectId = require('mongodb').ObjectId;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 10000000 // max file size 10MB = 10000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


// @route    POST api/notices
// @desc     Upload Notice
// @access   Private
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;

      const file = new Notice({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });

      await file.save();
      res.send(file);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

  
// @route    GET api/notices
// @desc     Get all notices
// @access   Public
router.get('/', async (req, res) => {
  try {
    const files = await Notice.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of notices. Try again later.');
  }
});


// @route    GET api/notices
// @desc     Download Notice
// @access   Public
router.get('/download/:id', async (req, res) => {
  try {
    const file = await Notice.findById(req.params['id']);
    res.set({
      'Content-Type': file.file_mimetype
    });

    res.sendFile(path.join(__dirname, '../../', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});


// @route    DELETE api/notices
// @desc     Delete Notice
// @access   Private
router.delete('/:id', auth, async (req, res) => {
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