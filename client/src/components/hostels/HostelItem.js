import propTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteHostel } from '../../actions/hostel';


const HostelItem = ({
    auth,
    deleteHostel,
    hostel: { _id, name, wardenname, date, gender, wardencontact},
    showActions
}) => (
    <tr>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{wardenname}</td>
        <td>{wardencontact}</td>
        <td className='delete-btn' style={{textAlign:'center'}}>
            {showActions && (
                <>
                    {!auth.loading && (
                        <i className="fas fa-trash" onClick={() => deleteHostel(_id)}/>
                    )}
                </>
            )}
        </td>
    </tr>
);

HostelItem.defaultProps = {
  showActions: true
};

HostelItem.propTypes = {
    hostel: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteHostel: propTypes.func.isRequired,
    showActions: propTypes.bool
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteHostel })(
    HostelItem
);