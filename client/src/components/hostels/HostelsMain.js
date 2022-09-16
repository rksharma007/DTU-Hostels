import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const HostelsMain = () => {
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '50%', padding: '2rem'}}>
          <h1 className='text-primary lead'>Hostels</h1>
        </div>
        <div style={{flex: '50%', padding: '2rem'}}>
          <Link to={'all'}><div className='btn btn-primary'> Hostel List </div></Link>
          <Link to={'add'}><div className='btn btn-success'> Add Hostel</div></Link>
        </div>
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
    <Outlet/>
    </section>
  )
}

export default HostelsMain;
