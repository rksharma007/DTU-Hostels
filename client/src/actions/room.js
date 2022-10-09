import axios from "axios";
import { setAlert } from "./alert";
import { loadStudent } from "./auth";
import { ADD_ROOM, DELETE_ROOM, GET_MY_ROOM, GET_ROOMS, REMOVE_STUDENT, ROOM_ERROR } from './types';

// Get logged in student's room
export const getMyRoom = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.get('/api/rooms/me', config);
        dispatch(loadStudent());
        dispatch({
            type: GET_MY_ROOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Get rooms
export const getRooms = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.get('/api/rooms', config);

        dispatch({
            type: GET_ROOMS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Add room
export const addRoom = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.post(`/api/rooms/add`, formData, config);

        dispatch({
            type: ADD_ROOM,
            payload: res.data
        });

        dispatch(setAlert('Added a new room', 'success'));
        navigate('/adminDashboard/room');
    } catch (err) {
        dispatch(setAlert('This room number already exists', 'danger'));
        dispatch({
            type: ROOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

// Remove Student
export const removeStudent = (room_id, student_id, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.put(`/api/rooms/remove/${room_id}/${student_id}`, config);

        await dispatch({
            type: REMOVE_STUDENT,
            payload: res.data
        });

        await dispatch(setAlert('Removed a student from room', 'success'));
        navigate('/adminDashboard/room');
    } catch (err) {
        dispatch(setAlert('Something went wrong', 'danger'));
        dispatch({
            type: ROOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

// Delete room
export const deleteRoom= _id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    if(window.confirm('Are you sure about DELETING ROOM? This can NOT be undone!')) {
        try {
            await axios.delete(`/api/rooms/${_id}`, config);

            dispatch({
                type: DELETE_ROOM,
                payload: _id
            });
            dispatch(setAlert('Deleted a room', 'success'));
        } catch (err) {
            dispatch({
                type: ROOM_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}