const express = require('express');
const router = express.Router();
const config = require('config');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const ObjectId = require('mongodb').ObjectId;

const keyId = config.get('RAZORPAY_API_KEY');
const keySecret = config.get('RAZORPAY_API_SECRET');

const Fee = require('../../models/Fees');
const Application = require('../../models/Application');
const Student = require('../../models/Student');
const authStudent = require('../../middleware/authStudent');

const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});

// @route    GET api/fees/getKey
// @desc     Get Razorpay Key
// @access   Private
router.get('/getKey', async(req,res) => {
    try{
        res.status(200).json({ key: config.get('RAZORPAY_API_KEY')})
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/fees/checkout
// @desc     Create Order Id
// @access   Private
router.post('/checkout', async(req,res) => {
  try{
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);  
    res.status(200).json({ success: true, order });

  } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route    GET api/fees/verifypayment/:application_id/:amount
// @desc     Verify payment and save recipt
// @access   Payment Gateway Callback_Url
router.post('/verifypayment/:application_id/:amount', async(req,res) => {
  try{
    const amount = req.params['amount'];

    const applicationid = ObjectId(req.params['application_id']); // convert to ObjectId
    const application = await Application.findById({ _id: applicationid });
    const studentid = application.studentid;
    const student = await Student.findById({ _id: studentid });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const fee = new Fee({
          applicationid,
          amount,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
      });

      await fee.save();
      
      student.feestatus = true;
      await student.save();

      application.feestatus = true;
      await application.save();

      res.redirect(`http://localhost:3000/studentDashboard/fees/paymentsuccess?reference=${razorpay_payment_id}`)

    } else {
      res.status(400).json({ success: false });
    }
  } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }

});

// @route    GET api/fees/receipts/:application_id
// @desc     Get current student's receipts
// @access   Private
router.get('/receipts/:application_id', authStudent, async(req,res) => {
  try {
      const application_id = ObjectId(req.params['application_id']);
      const myreceipts = await Fee.find({ applicationid : application_id });
      res.send(myreceipts);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;