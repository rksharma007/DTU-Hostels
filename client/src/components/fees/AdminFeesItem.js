import propTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const AdminFeesItem = ({ application : {
  date, fullname, roll, semester, mobile, feestatus, gender
}}) => {
  return (
    <tr>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{fullname}</td>
        <td>{roll}</td>
        <td style={{ "textAlign": "center" }}>{semester}</td>
        <td>{gender}</td>
        <td>{mobile}</td>
        <td>{feestatus === true ? 'Paid' : 'Not paid'}</td>

    </tr>
  )
}

AdminFeesItem.propTypes = {
  auth: propTypes.object.isRequired,
  application: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminFeesItem);
