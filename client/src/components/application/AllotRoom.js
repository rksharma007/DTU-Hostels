import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { allotApplication } from '../../actions/application';
import { getHostels } from '../../actions/hostel';
import { getRooms } from '../../actions/room';

const AllotRoom = ({
  auth,
  getRooms,
  getHostels,
  allotApplication,
  application: {applications},
  showActions,
  hostel: {hostels},
  room: {rooms}
}) => {

  useEffect(() => {
    getHostels();
  }, [getHostels]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  
  const location = useLocation();
  const applicationId = location.state;

  const firsthostel = hostels[0]._id.toString();
  const [hostel_id, setHostel_id] = useState(firsthostel);
  // const [room_id, setRoom_id] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    application_id: applicationId,
    roomId: ''
  })

  const {
    roomId
   } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    allotApplication(formData, navigate);
    //console.log(formData)
  };

  return (
    <>
    <p className='text-primary lead'> Select Room to Allot</p>
    <form className="form" onSubmit={ e => onSubmit(e)}>
      <label><p style={{ color: 'grey', fontSize: '14px'}}>Select Hostel:</p><select id="hostel_id" name="hostel_id" value={hostel_id} size="1" required onChange={e => setHostel_id(e.target.value)}>
        {hostels.map(hostel => ( <option value={hostel._id.toString()}> {hostel.name} </option>))}
      </select></label>
      <label><p style={{ color: 'grey', fontSize: '14px'}}>Select Room:</p><select id="roomId" name="roomId" value={roomId} size="1" required onChange={e => onChange(e)}>
        {rooms.map(room => (room.hostelid === hostel_id) && ( <option value={room._id.toString()}> {room.roomno} </option>))}
      </select></label>
      <input type="submit" style={{marginTop: '1rem', marginBottom: '2rem'}} className="btn btn-gradient" value="Allot" />
    </form>
    </>
  )
}

AllotRoom.propTypes = {
  getHostels: propTypes.func.isRequired,
  getRooms: propTypes.func.isRequired,
  application: propTypes.object.isRequired,
  allotApplication: propTypes.func.isRequired,
  hostel: propTypes.object.isRequired,
  room: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  hostel: state.hostel,
  room: state.room,
  auth: state.auth
})

export default connect(mapStateToProps, { getRooms, getHostels, allotApplication })(AllotRoom);