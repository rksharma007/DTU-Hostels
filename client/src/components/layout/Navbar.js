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
        <li><a href= 'http://hostels.dtu.ac.in/1/?page_id=72' target="_blank" rel="noopener noreferrer">Boys Hostel</a></li>
        <li><a href= 'http://hostels.dtu.ac.in/1/?page_id=113' target="_blank" rel="noopener noreferrer">Girls Hostel</a></li>
        <li><a href= 'http://hostels.dtu.ac.in/1/?page_id=18' target="_blank" rel="noopener noreferrer">Facilities</a></li>
	      <li><Link to='/notices'>Notices</Link></li>
        <li><a href= 'http://hostels.dtu.ac.in/1/?page_id=130' target="_blank" rel="noopener noreferrer">Contact</a></li>
        <li>
          { isAuthenticated && 
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
