import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const AdminStudentsMain = () => {
  
  const [name_roll, setName_Roll] = useState('')
  
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '25%', padding: '1rem', paddingRight:'0.3rem'}}>
          <h1 className='text-primary lead'>Students</h1>
        </div>

        <div style={{flex: '17%', paddingTop: '1rem', paddingLeft:'0rem'}}>
          <form className='form'>
            <input type="text"
              placeholder='Search by Name / Roll'
              size={16}
              value={name_roll}
              onChange={e => setName_Roll(e.target.value)}
            />
            </form>
        </div>
        <div style={{flex: '8%', paddingTop: '1.3rem', paddingLeft: '0.5rem', paddingRight: '1rem'}}>
            <Link to='search' state= {name_roll} > <i style={{paddingLeft: '0px'}} className='fas fa-search'/> </Link>
        </div>

        <div style={{flex: '50%', padding: '1rem', paddingRight: '0rem'}}>
          <Link to={'all'}><div className='btn btn-primary'> All </div></Link>
          <Link to={'hostellers'}><div className='btn btn-purple'> Hostellers</div></Link>
        </div>
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
    <Outlet/>
    </section>
  )
}

export default AdminStudentsMain;
