import propTypes from 'prop-types';
import { React } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';

const AdminDashboardMain = ({auth: {user}}) => {

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
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminDashboardMain);