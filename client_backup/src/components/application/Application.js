import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { deleteApplication, getMyApplication } from '../../actions/application';
import ApplicationItem from './ApplicationItem';


const Application = ({
  auth, auth: {user},
  getMyApplication,
  deleteApplication,
  application: {applications: {
    _id
  }},
  application: {applications},
  showActions
}) => {
  useEffect(() => {
    getMyApplication();
  }, [getMyApplication]);


  return (
    <div>
      {user && user.applicationstatus!==0 && (
        <div>
          <h1>Your Application Form</h1>
            {applications.map(application => (
              <ApplicationItem key={application._id} application={application} />
            ))}
        </div>
      )}
      
      {user && user.applicationstatus===0 && (
        <div>
          <h1>Hostel Application Form</h1>
          Not Applied Yet {'   '}
          <Link to={'apply'}>
          <div className='btn btn-primary'> Apply Now</div></Link>
        </div>
      )}
      <Outlet/>
      
    </div>
    
  )
}


Application.defaultProps = {
  showActions: true
};


Application.propTypes = {
  auth: propTypes.object.isRequired,
  getMyApplication: propTypes.func.isRequired,
  deleteApplication: propTypes.func.isRequired,
  application: propTypes.object.isRequired,
  showActions: propTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  application: state.application
});

export default connect(mapStateToProps, {getMyApplication, deleteApplication})(Application);