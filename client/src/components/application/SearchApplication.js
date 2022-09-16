import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getApplications } from '../../actions/application';
import AdminApplicationItem from './AdminApplicationItem';



const SearchApplication = ({
  auth,
  getApplications,
  application: {applications},
  showActions
}) => {

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const location = useLocation();
  const roll_mobile = location.state;
  
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
        {applications.map(application => ( (application.roll === roll_mobile 
        || application.mobile === roll_mobile ) &&
          <AdminApplicationItem key={application._id} application={application} />
        ))}
      </tbody>
    </table>
  )
}

SearchApplication.propTypes = {
  getApplications: propTypes.func.isRequired,
  application: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
})

export default connect(mapStateToProps, { getApplications })(SearchApplication);