import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin } from '../../actions/auth';

const AdminLogin = ({ adminLogin, auth:{isAuthenticated, user }}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
      adminLogin({ email, password });
  };

    // Navigate to dashboard if authenticated
    if(isAuthenticated && user) {
      return <Navigate to = '/adminDashboard'/>
    }

  return (
    <section className="container">
      <h1 className="large text-primary">Admin Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in to admin account</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            required
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-gradient" value="Sign In" />
      </form>
    </section>
  )
};

AdminLogin.propTypes = {
  adminLogin: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {adminLogin})(AdminLogin);