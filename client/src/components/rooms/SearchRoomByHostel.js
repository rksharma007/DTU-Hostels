import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRooms } from '../../actions/room';
import RoomItem from './RoomItem';



const SearchRoomByHostel = ({
  auth,
  getRooms,
  room: {rooms},
  showActions
}) => {

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  const location = useLocation();
  const hostel_id = location.state;
  
  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
          <td>Date</td>
          <td>Hostel</td>
          <td>Room No.</td>
          <td>Floor</td>
          <td>Beds</td>
          <td>AC</td>
          <td>Vacant</td>
          <td>View</td>
        </tr>
      </thead>
      <tbody>
        {rooms.map(room => ( (room.hostelid === hostel_id ) &&
          <RoomItem key={room._id} room={room} />
        ))}
      </tbody>
    </table>
  )
}

SearchRoomByHostel.propTypes = {
  getRooms: propTypes.func.isRequired,
  room: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, { getRooms })(SearchRoomByHostel);