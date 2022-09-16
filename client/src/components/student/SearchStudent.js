import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getStudents } from '../../actions/auth';
import AdminStudentItem from './AdminStudentItem';

const SearchStudent = ({
  student: {students},
  auth, getStudents
}) => {

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const location = useLocation();
  const name_roll = location.state;
  
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
        {students.map(student => ( (student.roll === name_roll || student.name === name_roll ) &&
            <AdminStudentItem key={student._id} student={student} />
        ))}
      </tbody>
    </table>
  )
}

SearchStudent.propTypes = {
  getStudents: propTypes.func.isRequired,
  student: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student
})

export default connect(mapStateToProps, { getStudents })(SearchStudent);