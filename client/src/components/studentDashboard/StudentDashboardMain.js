import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyApplication } from '../../actions/application';
import { getMyRoom } from '../../actions/room';
import Calendar from './Calendar';

const StudentDashboardMain = ({auth: {user}, room: {rooms}, getMyRoom, getMyApplication }) => {

  let applicationstatus = 0;
  if(user){
    if(user.applicationstatus === 0){applicationstatus = 'Not Applied'}
    else if(user.applicationstatus===1){applicationstatus ='Applied'}
    else if(user.applicationstatus===2){applicationstatus ='Rejected'}
    else if(user.applicationstatus===3){applicationstatus ='Approved'}
    else if(user.applicationstatus===4){applicationstatus ='Verified'}
    else if(user.applicationstatus===5){applicationstatus ='Allotted'}
  }

  useEffect(() => {
    getMyRoom();
  }, [getMyRoom]);

  useEffect(() => {
    getMyApplication();
  }, [getMyApplication]);

  return (
    <section className='container '>
      <div style={{display: 'flex'}}>
        <div style={{flex: '70%', padding: '2rem'}}>
          <h1 className='lead text-primary'>Welcome {user && user.name} <i className='fas fa-face-smile' style={{color: '#17a2b8'}}></i></h1>
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
                Roll
              </td>
              <td>
              {user && user.roll}
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
            <tr>
              <td>
                Application Status
              </td>
              <td>
                {user && applicationstatus}
              </td>
            </tr>
            <tr>
              <td>
                Room Id
              </td>
              <td>
              {user && user.roomid}
              </td>
            </tr>
            {user && user.roomid !== null && 
            <tr>
              <td>
                Room No.
              </td>
              <td>
              {rooms.map(room => (
                room._id === user.roomid && room.roomno
              ))}
              </td>
            </tr>
            }
            {user && user.applicationstatus === 5 && (
            <tr>
              <td>
                Fee Status
              </td>
              
                <td>
                  {user.feestatus === true ? 'Paid':'Not Paid'}
                </td>
            </tr>
            )}
            </tbody>
          </table>
          </div>
          <div style={{flex: '30%', padding: '2rem'}}>
            <Calendar/>
          </div>
      </div>
    </section>
  )
}

StudentDashboardMain.propTypes = {
  auth: propTypes.object.isRequired,
  room: propTypes.object.isRequired,
  getMyRoom: propTypes.func.isRequired,
  getMyApplication: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  application: state.application,
  room: state.room
});

export default connect(mapStateToProps, {getMyRoom, getMyApplication})(StudentDashboardMain);