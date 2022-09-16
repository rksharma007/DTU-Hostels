import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getComplaints } from '../../actions/complaint';
import AdminComplaintItem from './AdminComplaintItem';

const ResolvedComplaints = ({
  auth,
  getComplaints,
  complaint: {complaints},
  showActions
}) => {

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
          <td>Date</td>
          <td>Name</td>
          <td>Roll</td>
          <td>Complaint</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {complaints.map(complaint => ( complaint.resolved === true &&
            <AdminComplaintItem key={complaint._id} complaint={complaint} />
        ))}
      </tbody>
    </table>
  )
}

ResolvedComplaints.propTypes = {
  getComplaints: propTypes.func.isRequired,
  complaint: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  complaint: state.complaint
})

export default connect(mapStateToProps, { getComplaints })(ResolvedComplaints);