import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyReceipts } from '../../actions/fee';
import FeeReceiptItem from './FeeReceiptItem';


const FeeReceipt = ({ application: {applications}, getMyReceipts, fee: {receipt}}) => {
    const app_id = applications[0]._id;
    const application_id = app_id.toString()
    //console.log(application_id);
    
    useEffect(()=>{
        getMyReceipts(application_id);  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getMyReceipts]);

  
    return (
        <section className='container'>
        <h1 className='lead text-primary'>Receipts</h1>
        <div>
            <table className='table'>
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
            {receipt.map(myreceipt => (
                <FeeReceiptItem key={myreceipt._id} receipt={myreceipt}  />
            ))}
            </tbody>
            </table>
        </div>
        </section>
    )
}

FeeReceipt.propTypes = {
  getMyReceipts: propTypes.func.isRequired,
  application: propTypes.object.isRequired,
  fee: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  fee: state.fee,
  application: state.application
})

export default connect(mapStateToProps, { getMyReceipts })(FeeReceipt);