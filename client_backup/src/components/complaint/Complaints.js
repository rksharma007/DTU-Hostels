import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyComplaints } from '../../actions/complaint';
import ComplaintForm from './ComplaintForm';
import ComplaintItem from './ComplaintItem';

const Complaints = ({ getMyComplaints, complaint: {complaints}}) => {
  useEffect(()=>{
    getMyComplaints();
  },[getMyComplaints]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Complaints</h1>
      <p className='lead'>
        <i className='fas fa-receipt'></i>{' '}
        Post a new complaint
      </p>
      <ComplaintForm/>
      <p className='lead'>
        <i className='fas fa-receipt'></i>{' '}
        Previous Complaints
      </p>
      {/* <div className='posts'>
        {complaints.map(complaint => (
          <ComplaintItem key={complaint._id} complaint={complaint} />
        ))}
      </div> */}

      <div>
        <table className='table'>
          <thead>
            <tr>
              <td>Date</td>
              <td>Complaint</td>
              <td>Resolved</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
          {complaints.map(complaint => (
            <ComplaintItem key={complaint._id} complaint={complaint} />
          ))}
          </tbody>
        </table>
      </div>

    </section>
  )
}

Complaints.propTypes = {
  getMyComplaints: propTypes.func.isRequired,
  complaint: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  complaint: state.complaint
})

export default connect(mapStateToProps, { getMyComplaints })(Complaints);