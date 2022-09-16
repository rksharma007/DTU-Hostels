import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../img/dtulogo.png";

const Landing = () => {

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            <img className = "dtulogo" src={logo} alt="dtulogo"></img>
          </h1>
          <h1 className="x-large">DTU HOSTELS</h1>
          <p className="lead">
            Create your hostel account and manage the hostel activities.
          </p>
          <div className="buttons">
            <Link to='/studentLogin' className="btn btn-primary">Student Login</Link>
            <Link to='/studentRegister' className="btn btn-purple">Student Register</Link>
            <Link to='/adminLogin' className="btn btn-gradient">Admin Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Landing;