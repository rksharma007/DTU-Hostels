import axios from "axios";
import { setAlert } from "./alert";
import { ADD_HOSTEL, DELETE_HOSTEL, GET_HOSTELS, HOSTEL_ERROR } from './types';

// Get hostels
export const getHostels = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get('/api/hostels', config);

        dispatch({
            type: GET_HOSTELS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: HOSTEL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Add Hostel
export const addHostel = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post('/api/hostels', formData, config);

        dispatch({
            type: ADD_HOSTEL,
            payload: res.data
        });

        
        dispatch(setAlert('Added a new hostel', 'success'));
        navigate('/adminDashboard/hostel');
    } catch (err) {
        dispatch({
            type: HOSTEL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Hostel
export const deleteHostel = _id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if(window.confirm('Are you sure about DELETING HOSTEL? This can NOT be undone!')) {
        try {
            await axios.delete(`/api/hostels/${_id}`, config);

            dispatch({
                type: DELETE_HOSTEL,
                payload: _id
            });
            dispatch(setAlert('Deleted a hostel', 'success'));
        } catch (err) {
            dispatch({
                type: HOSTEL_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}