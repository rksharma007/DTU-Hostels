import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const AdminStudentItem = ({
  auth,
  student: { name, roll, applicationstatus, email},
}) =>{
  return (
    <tr>
        <td>{name}</td>
        <td>{roll}</td>
        <td>{email}</td>
        {applicationstatus === 0 && <td>Not Applied</td>}
        {applicationstatus === 1 && <td>Applied</td>}
        {applicationstatus === 2 && <td>Rejected</td>}
        {applicationstatus === 3 && <td>Approved</td>}
        {applicationstatus === 4 && <td>Verified</td>}
        {applicationstatus === 5 && <td>Allotted</td>}
    </tr>
  )
}

AdminStudentItem.propTypes = {
  student: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(
  AdminStudentItem
);