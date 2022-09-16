import propTypes from 'prop-types';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteRoom, removeStudent } from '../../actions/room';
import RoomPopup from './RoomPopup';

const RoomItem = ({
    auth,
    deleteRoom,
    hostel: {hostels},
    removeStudent,
    application: {applications},
    room: { _id, hostelid, roomno, floor, beds, acstatus, studentcount, vacant, studentid1, studentid2, studentid3, date },
    showActions
}) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const hostelname = hostels.map(hostel => (
        hostel._id === hostelid && hostel.name
    ));

return (
    <tr>
        <>
        <td style={{textAlign:'center'}}><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        <td>{hostelname}</td>
        <td>{roomno}</td>
        <td>{floor}</td>
        <td>{beds}</td>
        <td>{acstatus===true ? ('Yes') : ('No')}</td>
        <td>{vacant===true ? ('Yes') : ('No')}</td>
        </>

        {isOpen && <RoomPopup
            content={
                <>
                <table style={{marginTop: '1rem'}} className='popup-application-item'>
                    <tbody>
                        <tr>
                            <td>
                            <tr><td>Room Id</td><td>{_id}</td></tr>
                            <tr><td>Hostel Id</td><td>{hostelid}</td></tr>
                            <tr><td>Date</td><td>{<Moment format='YYYY/MM/DD'>{date}</Moment>}</td></tr>
                            <tr><td>Room No.</td><td>{roomno}</td></tr>
                            <tr><td>Hostel Name</td><td>{hostelname}</td></tr>
                            <tr><td>Floor</td><td>{floor}</td></tr>
                            <tr><td>Beds</td><td>{beds}</td></tr>
                            <tr><td>AC</td><td>{acstatus===true ? ('Yes') : ('No')}</td></tr>
                            <tr><td>Vacant</td><td>{vacant===true ? ('Yes') : ('No')}</td></tr>
                            <tr><td>Student Count</td><td>{studentcount}</td></tr>
                            </td>
                            <td>
                                List of students in this room
                                <table style={{marginTop: '1rem'}} className='popup-application-item'><tbody>
                                {studentid1!==null && applications.map(application => application.studentid===studentid1 &&
                                    (<tr>
                                        <td>{application.fullname}</td>
                                        <td>{application.roll}</td>
                                        <td><i className='fas fa-trash' style={{color: 'red'}} onClick={() => removeStudent(_id, studentid1, navigate)}></i></td>
                                    </tr>))
                                }
                                {studentid2!==null && applications.map(application => application.studentid===studentid2 &&
                                    (<tr>
                                        <td>{application.fullname}</td>
                                        <td>{application.roll}</td>
                                        <td><i className='fas fa-trash' style={{color: 'red'}} onClick={() => removeStudent(_id, studentid2, navigate)}></i></td>
                                    </tr>))
                                }
                                {studentid3!==null && applications.map(application => application.studentid===studentid3 &&
                                    (<tr>
                                        <td>{application.fullname}</td>
                                        <td>{application.roll}</td>
                                        <td><i className='fas fa-trash' style={{color: 'red'}} onClick={() => removeStudent(_id, studentid3, navigate)}></i></td>
                                    </tr>))
                                }
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <i className="fas fa-trash" style={{color:'red'}} onClick={() => deleteRoom(_id, navigate)}></i> {' '} Delete Room
                </>
            }
            handleClose={togglePopup}
        />
        }
        <td style={{textAlign: 'center'}}><i className='fas fa-eye' onClick={togglePopup} style={{color: '#17a2b8'}}></i></td>
    </tr>
)};

RoomItem.defaultProps = {
  showActions: true
};

RoomItem.propTypes = {
    room: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteRoom: propTypes.func.isRequired,
    application: propTypes.object.isRequired,
    showActions: propTypes.bool,
    hostel: propTypes.object.isRequired,
    removeStudent: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    hostel: state.hostel,
    application: state.application
});

export default connect(mapStateToProps, { removeStudent, deleteRoom })(
    RoomItem
);