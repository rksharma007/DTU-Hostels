import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRooms } from '../../actions/room';
import RoomItem from './RoomItem';


const AllRooms = ({
  auth,
  getRooms,
  getHostels,
  room: {rooms},
  showActions
}) => {

  useEffect(() => {
    getRooms();
  }, [getRooms]);

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
        {rooms.map(room => (
            <RoomItem key={room._id} room={room} />
        ))}
      </tbody>
    </table>
  )
}

AllRooms.propTypes = {
  getRooms: propTypes.func.isRequired,
  room: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
  room: state.room,
})

export default connect(mapStateToProps, { getRooms })(AllRooms);