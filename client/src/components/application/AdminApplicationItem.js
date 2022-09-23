import propTypes from 'prop-types';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { approveApplication, deleteApplication, rejectApplication, unallotApplication, verifyApplication } from '../../actions/application';
import ApplicationPopup from './ApplicationPopup';

const AdminApplicationItem = ({
    auth,
    application,
    application :  {
        _id,
        date,
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
    approveApplication,
    verifyApplication,
    rejectApplication,
    unallotApplication
}) => 
{
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const application_id = _id;

    return (
    <tr>
        <>
            <td><Moment format='YYYY/MM/DD'>{date}</Moment></td>
            <td>{fullname} </td>
            <td>{roll}</td>
            <td>{mobile}</td>
            <td>{gender}</td>
            <td>{status}</td>
        </>
        {isOpen && <ApplicationPopup
            content={
                <>
                <table style={{marginTop: '1rem'}} className='popup-application-item'>
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
                <i className="fas fa-trash" style={{color:'red'}} onClick={() => deleteApplication(_id, navigate)}></i> {' '} Delete Application
                {status === 'rejected' && (
                    <button className='btn btn-primary' onClick={() => approveApplication(_id)} style={{marginLeft: '20px'}}> Approve </button>
                )}
                {status !== 'rejected' && status !== 'allotted' && (
                    <button className='btn btn-danger' onClick={() => rejectApplication(_id)} style={{marginLeft: '20px'}}> Reject </button>
                )}
                {status === 'verified' && (
                    <Link to={'/adminDashboard/application/allot'} state= {application_id}><p className='btn btn-gradient' style={{marginLeft: '20px'}}> Allot Room</p></Link>
                )}
                {status === 'approved' && (
                    <button className='btn btn-success' onClick={() => verifyApplication(_id)} style={{marginLeft: '20px'}}> Verify </button>
                )}
                {status === 'applied' && (
                    <button className='btn btn-purple' onClick={() => approveApplication(_id)} style={{marginLeft: '20px'}}> Approve </button>
                )}
                {status === 'allotted' && (
                    <button className='btn btn-danger' onClick={() => unallotApplication(_id)} style={{marginLeft: '20px'}}> Un-Allot </button>
                )}
                </>
            }
            handleClose={togglePopup}
        />
        }
        <td style={{textAlign: 'center'}}><i className='fas fa-eye' onClick={togglePopup} style={{color: '#17a2b8'}}></i></td>
    </tr>
)};


AdminApplicationItem.propTypes = {
    application: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteApplication: propTypes.func.isRequired,
    approveApplication: propTypes.func.isRequired,
    rejectApplication: propTypes.func.isRequired,
    verifyApplication: propTypes.func.isRequired,
    unallotApplication: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {deleteApplication, approveApplication, verifyApplication, rejectApplication, unallotApplication})(
    AdminApplicationItem
);