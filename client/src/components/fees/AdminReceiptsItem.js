import propTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const AdminReceiptsItem = ({ rcpt : { date, applicationid, razorpay_order_id, razorpay_payment_id, amount } }) => {
  return (
    <tr>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{applicationid}</td>
        <td>{razorpay_order_id}</td>
        <td>{razorpay_payment_id}</td>
        <td>{amount}</td>
    </tr>
  )
}

AdminReceiptsItem.propTypes = {
  auth: propTypes.object.isRequired,
  fee: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminReceiptsItem);
