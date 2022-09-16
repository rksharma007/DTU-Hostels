import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { getHostels } from '../../actions/hostel';
import { addRoom } from '../../actions/room';

const AddRoom = ({
  addRoom,
  getHostels,
  hostel: {hostels},
  auth
}) => {

  useEffect(() => {
    getHostels();
  }, [getHostels]);

  const navigate = useNavigate();
  const firsthostel = hostels[0]._id.toString();


  const [formData, setFormData] = useState({
    roomno: '',
    floor: 1,
    beds: 1,
    hostel_id: firsthostel,
    acstatus: false,
  })

  const {
    roomno,
    floor,
    beds,
    acstatus,
    hostel_id
   } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addRoom(formData, navigate);
  };

  
  return (
    <>
    <h3 style={{color:'#17a2b8', marginTop:'1rem'}}> New Room Information</h3>
    
    <div className="post-form" style={{marginLeft: '200px', marginRight: '200px'}}>
      <form className="form" onSubmit={ e => onSubmit(e)}>

        <label>Hostel Name
        <select id="hostel_id" name="hostel_id" value={hostel_id} size="1" required onChange={e => onChange(e)}>
          {hostels.map(hostel => ( <option value={hostel._id.toString()}> {hostel.name} </option>))}
        </select></label>

        <label>Room Number
          <input type='text' placeholder='Room Number' name="roomno" value={roomno} required onChange={e => onChange(e)} />
        </label>

        <label>Floor
        <select id="floor" name="floor" value={floor} size="1" required onChange={e => onChange(e)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select></label>

        <label>Beds
        <select id="beds" name="beds" value={beds} size="1" required onChange={e => onChange(e)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select></label>

        <label>AC
        <select id="acstatus" name="acstatus" value={acstatus} size="1" required onChange={e => onChange(e)}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select></label>
      
        <input type="submit" style={{marginTop: '1rem', marginBottom: '2rem'}} className="btn btn-primary" value="Add Room" /> 
      </form>
    </div>
    </>
  )
}

AddRoom.propTypes = {
  addRoom: propTypes.func.isRequired,
  hostel: propTypes.object.isRequired,
  getHostels: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  hostel: state.hostel
});

export default connect(mapStateToProps, { getHostels, addRoom })(AddRoom);