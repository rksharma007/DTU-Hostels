import axios from "axios";
import { setAlert } from "./alert";
import { ADD_COMPLAINT, COMPLAINT_ERROR, DELETE_COMPLAINT, GET_MY_COMPLAINTS } from './types';


// Get my complaints
export const getMyComplaints = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
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


// Add Complaint
export const addComplaint = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
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
        },
        baseURL:'http://localhost:5000'
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