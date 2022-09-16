import React from 'react';
import logo from "../../img/dtulogo.png";

const NotFound = () => {

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            <img className = "dtulogo" src={logo} alt="dtulogo"/>
          </h1>
          <h1 className="x-large">404</h1>
          <p className="lead">
            Page not found!
          </p>
        </div>
      </div>
    </section>
  )
};

export default NotFound;