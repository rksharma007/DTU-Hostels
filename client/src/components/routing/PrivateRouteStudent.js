import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteStudent = ({children,  auth: { user, isAuthenticated, loading }}) => {

    if(!isAuthenticated) return <Navigate to = '/studentLogin' />;
    if (!loading && !isAuthenticated) return <Navigate to = '/studentLogin' />;
    else return children;
}

PrivateRouteStudent.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteStudent);