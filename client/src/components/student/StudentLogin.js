import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { studentLogin } from '../../actions/auth';

const StudentLogin = ({ studentLogin, auth:{isAuthenticated, user} }) => {

  const [formData, setFormData] = useState({
    email: '',
    roll: '',
    password: ''
  });

  const { email, roll, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
      studentLogin({ roll, email, password });
  };

  // Navigate to dashboard if authenticated
  if(isAuthenticated) {
    return <Navigate to = '/studentDashboard'/>
  }


  return (
    <section className="container">
      <h1 className="large text-primary">Student Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in to your account</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Roll (format: 2KXX/XX/XXX)" name="roll" required onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required onChange={e => onChange(e)} />
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
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/studentRegister'>Sign Up</Link>
      </p>
    </section>
  )
};


StudentLogin.propTypes = {
  studentLogin: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  
});

export default connect(mapStateToProps, {studentLogin})(StudentLogin);