import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { getApplications } from './application';
import { getHostels } from './hostel';
import { getRooms } from './room';
import {
    ADMIN_LOADED, AUTH_ERROR, CLEAR_USER, GET_STUDENTS, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, STUDENT_ERROR, USER_LOADED
} from './types';

// ------------------STUDENT PART--------------------

// Load Student
export const loadStudent = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Methods": "GET, PUT, POST"
            },
            baseURL:'http://localhost:5000'
        }

        const res = await axios.get('/api/students/me', config);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};


// Register Student
export const studentRegister = ({ name, roll, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, roll, email, password });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Methods": "PUT,POST,DELETE"
            },
            baseURL:'http://localhost:5000'
        }

        const res = await axios.post('/api/students/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        //dispatch(loadStudent());
        dispatch(setAlert('Successfully Registered. Go to login', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Login Student
export const studentLogin = ({ email, roll, password }) => async dispatch => {
    const body = JSON.stringify({ email, roll, password });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            baseURL:'http://localhost:5000'
        }

        const res = await axios.post('/api/students/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadStudent());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// LOGOUT
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_USER});
};

// Get students
export const getStudents = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL:'http://localhost:5000'
    }
    try {
        const res = await axios.get('/api/students', config);

        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: STUDENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// ------------------ADMIN PART--------------------

// Load Admin
export const loadAdmin = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Methods": "GET, PUT, POST"
            },
            baseURL:'http://localhost:5000'
        }

        const res = await axios.get('/api/admin/me', config);

        dispatch({
            type: ADMIN_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Login Admin
export const adminLogin = ({ email, password }) => async dispatch => {
    const body = JSON.stringify({ email, password });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            baseURL:'http://localhost:5000'
        }

        const res = await axios.post('/api/admin/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadAdmin());
        dispatch(getStudents());
        dispatch(getHostels());
        dispatch(getRooms());
        dispatch(getApplications());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}