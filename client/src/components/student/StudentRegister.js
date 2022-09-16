import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { studentRegister } from '../../actions/auth';


const StudentRegister = ({ setAlert, studentRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll: '',
    password: '',
    password2: ''
  });

  const { name, email, roll, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    if(password !== password2){
      setAlert('Passwords do not match', 'danger');
    }
    else{
      studentRegister({ name, roll, email, password });
    }
  };

  // Navigate if authenticated
  // if(isAuthenticated) {
  //   return <Navigate to = '/studentDashboard'/>
  // }

  return (
    <section className="container">
      <h1 className="large text-primary">Student Registration</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Student Account</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Roll (format: 2KXX/XX/XXX)" name="roll" required onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required onChange={e => onChange(e)}/>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="8"
            required
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/studentLogin'>Sign In</Link>
      </p>
    </section>
  )
};

StudentRegister.propTypes = {
  setAlert: propTypes.func.isRequired,
  studentRegister: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, {setAlert, studentRegister})(StudentRegister);