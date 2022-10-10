import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllFees } from '../../actions/fee';
import AdminReceiptsItem from './AdminReceiptsItem';

const AllReceipts = ({getAllFees, fee: {receipt}}) => {

  useEffect(() => {
    getAllFees();
  }, [getAllFees]);

  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
          <td>Date</td>
          <td>Application Id</td>
          <td>Order Id</td>
          <td>Payment Id</td>
          <td>Amount</td>
        </tr>
      </thead>
      <tbody>
        {receipt.map(rcpt => (
          <AdminReceiptsItem key={rcpt._id} rcpt={rcpt} />
        ))}
      </tbody>
    </table>
  )
}

AllReceipts.propTypes = {
  getAllFees: propTypes.func.isRequired,
  fee: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  fee: state.fee,
})

export default connect(mapStateToProps, {getAllFees})(AllReceipts);