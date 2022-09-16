import propTypes from 'prop-types';
import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComplaint } from '../../actions/complaint';


const ComplaintItem = ({
    auth,
    deleteComplaint,
    complaint: { _id, text, studentid, date, resolved},
    showActions
}) => (
    // <div className="complaint-parent bg-white p-1 my-1">
    //     <div className="complaint-child post-date">
    //         <p><Moment format='YYYY/MM/DD'>{date}</Moment></p>
    //     </div>
    //     <div className='complaint-child'>
    //         <p className="my-1"> {text} </p>
    //     </div>
    //     <div className='complaint-child'>
    //         <p>
    //             Resolved: {resolved === false ? 'No' : 'Yes'}
    //         </p>
    //     </div>
    //     <div className='delete-btn'>
    //         {showActions && (
    //             <Fragment>
    //                 {!auth.loading && auth.user._id === studentid && (
    //                     <i className="fas fa-trash" onClick={() => deleteComplaint(_id)}/>
    //                 )}
    //             </Fragment>
    //         )}
    //     </div>
    // </div>
    <tr>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{text}</td>
        <td style={{textAlign:'center'}}>{resolved === false ? 'No' : 'Yes'}</td>
        <td className='delete-btn' style={{textAlign:'center'}}>
            {showActions && (
                <Fragment>
                    {!auth.loading && auth.user._id === studentid && (
                        <i className="fas fa-trash" onClick={() => deleteComplaint(_id)}/>
                    )}
                </Fragment>
            )}
        </td>
    </tr>
);

ComplaintItem.defaultProps = {
  showActions: true
};

ComplaintItem.propTypes = {
    complaint: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteComplaint: propTypes.func.isRequired,
    showActions: propTypes.bool
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComplaint })(
    ComplaintItem
);