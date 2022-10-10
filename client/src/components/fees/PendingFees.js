import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getApplications } from '../../actions/application';
import AdminFeesItem from './AdminFeesItem';

const PendingFees = ({
  getApplications,
  application: {applications},
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
            <td>Semester</td>
            <td>Sex</td>
            <td>Mobile</td>
            <td>Fee Status</td>
        </tr>
      </thead>
      <tbody> 
        {applications.map(application => ( application.status==='allotted' && application.feestatus===false &&
          <AdminFeesItem key={application._id} application={application} />
        ))}
      </tbody>
    </table>
  )
}

PendingFees.propTypes = {
  getApplications: propTypes.func.isRequired,
  application: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
})

export default connect(mapStateToProps, { getApplications })(PendingFees);