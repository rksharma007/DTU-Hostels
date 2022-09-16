import propTypes from 'prop-types';
import { React } from 'react';
import { connect } from 'react-redux';

const StudentDashboardMain = ({auth: {user}}) => {
  let applicationstatus = 0;
  if(user){
    if(user.applicationstatus === 0){
      applicationstatus = 'Not Applied';
    }
    else if(user.applicationstatus===1){
      applicationstatus ='Applied';
    }
    else if(user.applicationstatus===2){
      applicationstatus ='Rejected';
    }
    else if(user.applicationstatus===3){
      applicationstatus ='Approved';
    }
    else if(user.applicationstatus===4){
      applicationstatus ='Verified';
    }
    else if(user.applicationstatus===5){
      applicationstatus ='Allotted';
    }
  }

  return (
    <section className='container '>
      <div>
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
          </tbody>
        </table>
      </div>
    </section>
  )
}

StudentDashboardMain.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(StudentDashboardMain);