import axios from "axios";
import { setAlert } from "./alert";
import { loadStudent } from "./auth";
import { ADD_APPLICATION, ALLOT_APPLICATION, APPLICATION_ERROR, APPROVE_APPLICATION, DELETE_APPLICATION, GET_APPLICATIONS, GET_MY_APPLICATION, REJECT_APPLICATION, UNALLOT_APPLICATION, VERIFY_APPLICATION } from './types';

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


// Get all application
export const getApplications = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.get('/api/application/', config);
        dispatch({
            type: GET_APPLICATIONS,
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

// Reject Application
export const rejectApplication = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }

    try {
        const res = await axios.put(`/api/application/reject/${id}`, config);

        dispatch({
            type: REJECT_APPLICATION,
            payload: {id, status: res.data.status}
        });
        dispatch(setAlert('Rejected an application', 'success'));
        
        // dispatch(getApplications());
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Approve Application
export const approveApplication = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }

    try {
        const res = await axios.put(`/api/application/approve/${id}`, config);

        dispatch({
            type: APPROVE_APPLICATION,
            payload: {id, status: res.data.status}
        });
        dispatch(setAlert('Approved an application', 'success'));
        
        // dispatch(getApplications());
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Verify Application
export const verifyApplication = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }

    try {
        const res = await axios.put(`/api/application/verify/${id}`, config);

        dispatch({
            type: VERIFY_APPLICATION,
            payload: {id, status: res.data.status}
        });
        dispatch(setAlert('Verified an application', 'success'));
        
        // dispatch(getApplications());
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Allot Application
export const allotApplication = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.put('/api/application/allot', formData, config);

        dispatch({
            type: ALLOT_APPLICATION,
            payload: res.data
        });
        dispatch(setAlert('Allotted room to an application', 'success'));
        
        await dispatch(getApplications());
        navigate('/adminDashboard/application');
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        dispatch(setAlert('Maybe room is not vacant', 'danger'));
    }
}

// Unallot Application
export const unallotApplication = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }

    try {
        const res = await axios.put(`/api/application/unallot/${id}`, config);

        dispatch({
            type: UNALLOT_APPLICATION,
            payload: {id, status: res.data.status}
        });
        dispatch(setAlert('Unallotted an application', 'success'));
        
        // dispatch(getApplications());
    } catch (err) {
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
