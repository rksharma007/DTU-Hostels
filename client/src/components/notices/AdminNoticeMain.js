import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const AdminNoticeMain = () => {
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '80%', padding: '2rem'}}>
          <h1 className='text-primary lead'>Notices</h1>
        </div>
        <div style={{flex: '20%', padding: '2rem'}}>
          <Link to={'add'}><div className='btn btn-primary'> Add Notice </div></Link>
        </div>
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
    <Outlet/>
    </section>
  )
}

export default AdminNoticeMain;
