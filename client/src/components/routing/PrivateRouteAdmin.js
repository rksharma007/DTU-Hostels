import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({children,  auth: { user, isAuthenticated, loading }}) => {

    if(!isAuthenticated) return <Navigate to = '/adminLogin' />;
    if (!loading && !isAuthenticated) return <Navigate to = '/adminLogin' />;
    else return children;
}

PrivateRouteAdmin.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);