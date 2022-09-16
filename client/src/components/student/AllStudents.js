import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../../actions/auth';
import AdminStudentItem from './AdminStudentItem';


const AllStudents = ({
  student: {students},
  auth, getStudents
}) => {

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
          <td>Name</td>
          <td>Roll</td>
          <td>E-mail</td>
          <td>Application Status</td>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
            <AdminStudentItem key={student._id} student={student} />
        ))}
      </tbody>
    </table>
  )
}

AllStudents.propTypes = {
  getStudents: propTypes.func.isRequired,
  student: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student
})

export default connect(mapStateToProps, { getStudents })(AllStudents);
