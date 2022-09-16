import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminApplicationsMain = () => {

const [roll_mobile, setRoll_Mobile] = useState('')

  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '25%', padding: '1rem', paddingRight:'0.3rem'}}>
          <h1 className='text-primary lead'> Applications</h1>
        </div>

        <div style={{flex: '17%', paddingTop: '1rem', paddingLeft:'0rem'}}>
          <form className='form'>
            <input type="text"
              placeholder='Search by Roll / Mobile'
              size={11}
              value={roll_mobile}
              onChange={e => setRoll_Mobile(e.target.value)}
            />
            </form>
        </div>
        <div style={{flex: '8%', paddingTop: '1.3rem', paddingLeft: '0.5rem', paddingRight: '1rem'}}>
            <Link to='search' state= {roll_mobile} > <i style={{paddingLeft: '0px'}} className='fas fa-search'/> </Link>
        </div>
        
        <div style={{flex: '50%', padding: '1rem', paddingRight: '0rem'}}>
          <Link to={'all'}><div className='btn btn-dark'> All </div></Link>
          <Link to={'applied'}><div className='btn btn-primary'> Applied</div></Link>
          <Link to={'rejected'}><div className='btn btn-danger'> Rejected</div></Link>
          <Link to={'approved'}><div className='btn btn-purple'> Approved</div></Link>
          <Link to={'verified'}><div className='btn btn-success'> Verified</div></Link>
          <Link to={'allotted'}><div className='btn btn-gradient'> Allotted</div></Link>
        </div>
        
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
    <Outlet/>
    </section>
  )
}

export default AdminApplicationsMain;