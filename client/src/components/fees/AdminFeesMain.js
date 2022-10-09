import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminFeesMain = () => {
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '50%', padding: '2rem'}}>
          <h1 className='text-primary lead'>Fees</h1>
        </div>
        <div style={{flex: '50%', padding: '2rem'}}>
            <Link to={'all'}><div className='btn btn-primary'> All </div></Link>
            <Link to={'pending'}><div className='btn btn-danger'> Pending </div></Link>
            <Link to={'paid'}><div className='btn btn-success'> Paid </div></Link>
        </div>
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
      <Outlet/>
    </section>
  )
}

export default AdminFeesMain;
