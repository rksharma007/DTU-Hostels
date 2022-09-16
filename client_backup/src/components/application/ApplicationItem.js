import propTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteApplication } from '../../actions/application';


const ApplicationItem = ({
    auth,
    application,
    application:  {
        _id,
        studentid,
        status,
        fullname,
        gender,
        roll,
        branch,
        semester,
        email,
        mobile,
        gradyear,
        fathername,
        fathermobile,
        mothername,
        mothermobile,
        localguardianname,
        localguardianmobile,
        nationality,
        permanentaddress_country,
        permanentaddress_state,
        permanentaddress_city,
        permanentaddress_addressline1,
        permanentaddress_addressline2,
        correspondenceaddress_country,
        correspondenceaddress_state,
        correspondenceaddress_city,
        correspondenceaddress_addressline1,
        correspondenceaddress_addressline2
    },
    deleteApplication,
    showActions
}) => 
{
    const navigate = useNavigate();
    
    return (
    <div>
    <table style={{marginTop: '2rem'}} className='container-dashboard table-application-item'>
        <tbody>
        <tr><td>Application Id</td><td>{_id}</td></tr>
        <tr><td>Student Id</td><td>{studentid}</td></tr>
        {application.date && <tr><td>Date</td><td>{<Moment format='YYYY/MM/DD'>{application.date}</Moment>}</td></tr>}
        <tr><td>Application Status</td><td>{status}</td></tr>
        <tr><td>Fullname</td><td>{fullname}</td></tr>
        <tr><td>Gender</td><td>{gender}</td></tr>
        <tr><td>Roll</td><td>{roll}</td></tr>
        <tr><td>Branch</td><td>{branch}</td></tr>
        <tr><td>Semester</td><td>{semester}</td></tr>
        <tr><td>E-mail</td><td>{email}</td></tr>
        <tr><td>Mobile</td><td>{mobile}</td></tr>
        <tr><td>Graduation Year</td><td>{gradyear}</td></tr>
        <tr><td>Father Name</td><td>{fathername}</td></tr>
        <tr><td>Father Mobile</td><td>{fathermobile}</td></tr>
        <tr><td>Mother Name</td><td>{mothername}</td></tr>
        <tr><td>Mother Mobile</td><td>{mothermobile}</td></tr>
        <tr><td>Guardian Name</td><td>{localguardianname}</td></tr>
        <tr><td>Guardian Mobile</td><td>{localguardianmobile}</td></tr>
        <tr><td>Nationality</td><td>{nationality}</td></tr>
        <tr><td>Permanent Address</td><td>
            {permanentaddress_addressline1}{', '}
            {permanentaddress_addressline2}{', '}
            {permanentaddress_city}{', '}
            {permanentaddress_state}{', '}
            {permanentaddress_country}
            </td></tr>
        <tr><td>Correspondence Address</td><td>
            {correspondenceaddress_addressline1}{', '}
            {correspondenceaddress_addressline2}{', '}
            {correspondenceaddress_city}{', '}
            {correspondenceaddress_state}{', '}
            {correspondenceaddress_country}
            </td></tr>
        </tbody>
    </table>
    {showActions && (
        <div style={{marginTop: '1rem'}}>
            {!auth.loading && auth.user.applicationstatus!==5 && auth.user.applicationstatus!==4 && (
                <>
                <i className="fas fa-trash" style={{color:'red'}} onClick={() => deleteApplication(_id, navigate)}/> {' '} Delete Application
                </>
            )}
        </div>
        )}
    </div>
)};

ApplicationItem.defaultProps = {
    showActions: true
  };

ApplicationItem.propTypes = {
    application: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    showActions: propTypes.bool,
    deleteApplication: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {deleteApplication})(
    ApplicationItem
);