import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { getHostels } from '../../actions/hostel';

const RoomsMain = ({
  hostel: {hostels},
  getHostels, auth
}) => {

  useEffect(() => {
    getHostels();
  }, [getHostels]);

  const firsthostel = hostels[0]._id.toString();
  const [hostel_id, setHostel_id] = useState(firsthostel);
  
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '25%', padding: '1rem', paddingRight:'0.3rem'}}>
          <h1 className='text-primary lead'>Rooms</h1>
        </div>

        <div style={{flex: '17%', paddingTop: '1rem', paddingLeft:'0rem'}}>
          <form className='form'>
            <label><p style={{ color: 'grey', fontSize: '14px'}}>Search by hostel:</p><select id="hostel_id" name="hostel_id" value={hostel_id} size="1" required onChange={e => setHostel_id(e.target.value)}>
              {hostels.map(hostel => ( <option value={hostel._id.toString()}> {hostel.name} </option>))}
            </select></label>
          </form>
        </div>
        <div style={{flex: '8%', paddingTop: '2.5rem', paddingLeft: '0.5rem', paddingRight: '1rem'}}>
            <Link to='search' state= {hostel_id} > <i style={{paddingLeft: '0px'}} className='fas fa-search'/> </Link>
        </div>

        <div style={{flex: '50%', padding: '1rem', paddingRight: '0rem'}}>
          <Link to={'all'}><div className='btn btn-primary'> All Rooms </div></Link>
          <Link to={'vacant'}><div className='btn btn-purple'> Vacant Rooms </div></Link>
          <Link to={'add'}><div className='btn btn-success'> Add Room</div></Link>
        </div>
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
    <Outlet/>
    </section>
  )
}

RoomsMain.propTypes = {
  getHostels: propTypes.func.isRequired,
  hostel: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  hostel: state.hostel
});

export default connect(mapStateToProps, { getHostels})(RoomsMain);