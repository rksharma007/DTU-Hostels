import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkout, getKey } from '../../actions/fee';
import { getMyRoom } from '../../actions/room';

const FeePay = ({ auth: {user}, room: {rooms}, getMyRoom, getKey, fee, checkout, application }) => {

  useEffect(()=>{
    getMyRoom();
  },[getMyRoom]);

  useEffect(()=>{
    getKey();
  },[getKey]);

  useEffect(()=>{
    checkout(amount); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  const myroom = rooms[0];
  let amount = 0;
  if(myroom.acstatus === true && myroom.beds === 2){amount = 16000}
  else if(myroom.acstatus === true && myroom.beds === 3){amount = 14000}
  else if(myroom.acstatus === false && myroom.beds === 2){amount = 12000}
  else if(myroom.acstatus === false && myroom.beds === 3){amount = 10000}

  const checkoutHandler = async (amount) => {
    const key = fee.key;
    const order = fee.order.order;
    const applicationid = application.applications[0]._id;
    //const { data: { order } } = await axios.post("http://localhost:5000/api/fees/checkout", {amount});

    const options = {
        key,
        order_id: order.id,
        amount: order.amount,
        currency: "INR",
        name: "DTU Hostel",
        description: "Hostel Fees",
        image: "https://avatars.githubusercontent.com/u/77050199?v=4",
        callback_url: `http://localhost:5000/api/fees/verifypayment/${applicationid}/${amount}`,
        //callback_url: `/studentDashboard/fees/verifyPayment/${applicationid}/${amount}`,
        notes: {
            "address": "DTU, Shahbad, Daulatpur, New Delhi"
        },
        theme: {
            "color": "#9edb02"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    
    <section className='container'>
      <h1 className='lead text-primary'>Payment</h1>
      {user.applicationstatus===5 && (
        <>
        <table className='table'>
          <tbody>
          <tr><td>Name</td><td>{user.name}</td></tr>
          <tr><td>Roll</td><td>{user.roll}</td></tr>
          <tr><td>Email</td><td>{user.email}</td></tr>
          <tr><td>Fee Amount</td><td>
            {amount}
          </td></tr>
          <tr><td>Fee Status</td><td>
            {user.feestatus === false ? 'Not Paid' :'Paid'}
          </td></tr>
          </tbody>
        </table>
        {user.feestatus === false && (<button className="btn btn-danger" style={{ "marginTop": "10px"}} onClick={() => checkoutHandler(amount)}>Pay</button>)}
        </>
      )}

      {user.applicationstatus !== 5 && (
      <div className='text-primary lead'> Room not allotted yet </div>
      )}
    </section>
  )
}

FeePay.propTypes = {
  auth: propTypes.object.isRequired,
  room: propTypes.object.isRequired,
  fee: propTypes.object.isRequired,
  getMyRoom: propTypes.func.isRequired,
  getKey: propTypes.func.isRequired,
  checkout: propTypes.func.isRequired,
  application: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  room: state.room,
  application: state.application,
  fee: state.fee
});

export default connect(mapStateToProps, { getMyRoom, getKey, checkout })(FeePay);