import axios from "axios";
import { setAlert } from "./alert";
import { ADD_COMPLAINT, COMPLAINT_ERROR, DELETE_COMPLAINT, GET_COMPLAINTS, GET_MY_COMPLAINTS, UPDATE_COMPLAINT } from './types';


// Get my complaints
export const getMyComplaints = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get('/api/complaints/me', config);

        dispatch({
            type: GET_MY_COMPLAINTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: COMPLAINT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Get complaints
export const getComplaints = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get('/api/complaints', config);

        dispatch({
            type: GET_COMPLAINTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPLAINT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Resolve Complaint
export const changeStatusComplaint = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const res = await axios.put(`/api/complaints/update/${id}`, config);

        dispatch({
            type: UPDATE_COMPLAINT,
            payload: {id, resolved: res.data}
        });
        dispatch(setAlert('Updated a complaint status', 'success'));
        
        dispatch(getComplaints());
    } catch (err) {
        dispatch({
            type: COMPLAINT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Add Complaint
export const addComplaint = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post('/api/complaints', formData, config);

        dispatch({
            type: ADD_COMPLAINT,
            payload: res.data
        });
        dispatch(setAlert('Added a new complaint', 'success'));
    } catch (err) {
        dispatch({
            type: COMPLAINT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Complaint
export const deleteComplaint = _id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        await axios.delete(`/api/complaints/${_id}`, config);

        dispatch({
            type: DELETE_COMPLAINT,
            payload: _id
        });
        dispatch(setAlert('Deleted a complaint', 'success'));
    } catch (err) {
        dispatch({
            type: COMPLAINT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}