import React from 'react';

const AdminLogin = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">Admin Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Admin Account</p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            required
          />
        </div>
        <input type="submit" className="btn btn-gradient" value="Sign In" />
      </form>
    </section>
  )
};

export default AdminLogin;