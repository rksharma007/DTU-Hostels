import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';


const FeesMain = ({application: {applications}}) => {
  const application = applications[0];
  return (
    <section>
      <div style={{display: 'flex'}}>
        <div style={{flex: '50%', padding: '2rem'}}>
          <h1 className='text-primary large'>Fees</h1>
        </div>
        { application && application.status === "allotted" && (
        <div style={{flex: '50%', padding: '2rem', textAlign: 'right'}}>
          <Link to={'payfee'}><div className='btn btn-success'> Pay Fee </div></Link>
          <Link to={'receipts'}><div className='btn btn-primary'> Receipts </div></Link>
        </div>
        )}
        { application && application.status !== "allotted" && (
        <div style={{flex: '50%', padding: '2rem', textAlign: 'right'}}>
          <h1 className='text-danger'>Room not allotted yet</h1>
        </div>
        )}
      </div>
      <hr style={{marginLeft: '0rem', marginRight: '3rem'}}/>
      <Outlet/>
    </section>
  )
}

FeesMain.propTypes = {
  application: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, { })(FeesMain);
