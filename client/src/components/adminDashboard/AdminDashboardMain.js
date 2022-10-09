import propTypes from 'prop-types';
import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudents, loadAdmin } from '../../actions/auth';
import { getHostels } from '../../actions/hostel';
import { getRooms } from '../../actions/room';
import Calendar from './Calendar';


const AdminDashboardMain = ({auth: {user}, loadAdmin, getHostels, getRooms, getStudents}) => {
  useEffect(() => {
    loadAdmin();
  }, [loadAdmin]);
  useEffect(() => {
    getStudents();
  }, [getStudents]);
  useEffect(() => {
    getHostels();
  }, [getHostels]);
  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <section className='container '>
      <div style={{display: 'flex'}}>
        <div style={{flex: '50%', padding: '2rem'}}>
        <h1 className='lead text-primary'>Welcome Admin <i className='fas fa-coffee' style={{color: '#936b34'}}></i></h1>
          <table className='table'>
            <tbody>
            <tr>
              <td className='td'>
                Name
              </td>
              <td>
              {user && user.name}
              </td>
            </tr>
            <tr>
              <td>
                Email
              </td>
              <td>
              {user && user.email}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div style={{flex: '50%', padding: '2rem'}}>
          <Calendar/>
        </div>
      </div>
      
    </section>
  )
}

AdminDashboardMain.propTypes = {
  auth: propTypes.object.isRequired,
  loadAdmin: propTypes.func.isRequired,
  getRooms: propTypes.func.isRequired,
  getHostels: propTypes.func.isRequired,
  getStudents: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loadAdmin, getHostels, getStudents, getRooms})(AdminDashboardMain);