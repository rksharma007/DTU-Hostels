import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom";
import { getMyApplication } from '../../actions/application';
import { loadStudent } from '../../actions/auth';
import { getMyRoom } from '../../actions/room';

const PaymentSuccess = ({loadStudent, getMyApplication, getMyRoom}) => {

  useEffect(()=>{
    loadStudent();
  },[loadStudent]);
  
  useEffect(()=>{
    getMyApplication();
  },[getMyApplication]);

  useEffect(()=>{
    getMyRoom();
  },[getMyRoom]);

  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    <div className='container' style={{ "alignItems":"center", "justifyContent": "center", "textAlign": "center" }}>
    <h1 className='large' style={{ "color": "#28a745"}}> Payment Successful</h1>
    <p className='text text-primary lead'> Payment Reference Number: {referenceNum } </p>
    <button className='btn btn-light' style={{"margin": "20px"}}><Link to='/studentDashboard/fees'> Go back </Link></button>
    {/* <button onClick={() => window.location.reload()}>Refresh</button> */}
    </div>
  )
}

PaymentSuccess.propTypes = {
  loadStudent: propTypes.func.isRequired,
  getMyRoom: propTypes.func.isRequired,
  getMyApplication: propTypes.func.isRequired
};

export default connect(null, {loadStudent, getMyApplication, getMyRoom})(PaymentSuccess);
