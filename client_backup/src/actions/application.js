import axios from "axios";
import { setAlert } from "./alert";
import { loadStudent } from "./auth";
import { ADD_APPLICATION, APPLICATION_ERROR, DELETE_APPLICATION, GET_MY_APPLICATION } from './types';

// Get my application
export const getMyApplication = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.get('/api/application/me', config);
        dispatch(loadStudent());
        dispatch({
            type: GET_MY_APPLICATION,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Add Application
export const addApplication = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.post('/api/application/apply', formData, config);
        dispatch({
            type: ADD_APPLICATION,
            payload: res.data
        });
        dispatch(setAlert('Application Submitted', 'success'));
        dispatch(loadStudent());

        navigate('/studentDashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Application
export const deleteApplication = (_id, navigate) => async dispatch => {
    const config = {
        baseURL:'http://localhost:5000'
    }
    if(window.confirm('Are you sure about DELETING YOUR APPLICATION? This can NOT be undone!')) {
        try {
            await axios.delete(`/api/application/delByStudent/${_id}`, config);

            dispatch({
                type: DELETE_APPLICATION,
                payload: _id
            });
            dispatch(loadStudent());
            navigate('/studentDashboard');
            dispatch(setAlert('Application Deleted', 'success'));
        } catch (err) {
            dispatch({
                type: APPLICATION_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};
