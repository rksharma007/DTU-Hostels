import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getApplications } from '../../actions/application';
import AdminApplicationItem from './AdminApplicationItem';

const VerifiedApplications = ({
  auth,
  getApplications,
  application: {applications},
  showActions
}) => {

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
            <td>Date</td>
            <td>Name </td>
            <td>Roll</td>
            <td>Mobile</td>
            <td>Sex</td>
            <td>Status</td>
            <td>View</td>
        </tr>
      </thead>
      <tbody> 
        {applications.map(application => ( application.status==='verified' && 
          <AdminApplicationItem key={application._id} application={application} />
        ))}
      </tbody>
    </table>
  )
}

VerifiedApplications.propTypes = {
  getApplications: propTypes.func.isRequired,
  application: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
})

export default connect(mapStateToProps, { getApplications })(VerifiedApplications);