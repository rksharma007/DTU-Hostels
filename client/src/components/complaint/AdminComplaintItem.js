import propTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { changeStatusComplaint } from '../../actions/complaint';

const AdminComplaintItem = ({
    auth,
    changeStatusComplaint,
    complaint: { _id, name, roll, text, studentid, date, resolved},
}) =>{
    
    return (
    <tr>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{name}</td>
        <td>{roll}</td>
        <td>{text}</td>
        <td style={{textAlign:'center'}}>
            {resolved === false ? 
                <i className='fas fa-check-circle' style={{color:'#d1d1d1', fontSize:'2rem'}} onClick={() => changeStatusComplaint(_id)} />
            : 
                <i className='fas fa-check-circle' style={{color:'#4CBB17', fontSize:'2rem'}} onClick={() => changeStatusComplaint(_id)} />
            }
        </td>
    </tr>
)};

AdminComplaintItem.propTypes = {
    complaint: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    changeStatusComplaint: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { changeStatusComplaint })(
    AdminComplaintItem
);