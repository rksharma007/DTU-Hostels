import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading}, logout }) => {

  return (
    <nav className="navbar bg-gradient">
      <h1>
        <Link to='/'> DTU Hostels</Link>
      </h1>
      <ul>
        <li><Link to='/boysHostel'>Boys Hostels</Link></li>
	      <li><Link to='/girlsHostel'>Girls Hostels</Link></li>
        <li><Link to='/hostelFacilities'>Facilities</Link></li>
	      <li><Link to='/notices'>Notices</Link></li>
	      <li><Link to='/contact'>Contact</Link></li>
        <li>
          { !loading && isAuthenticated && 
            (
              <a onClick={logout} href='#!'>
                <i className='fas fa-sign-out-alt'></i>{' '}
                <span className='hide-sm'>Logout</span>
              </a>
            )
          }
        </li>
      </ul>
    </nav>
  )
};

Navbar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
