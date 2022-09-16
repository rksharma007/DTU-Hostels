import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import {
    AUTH_ERROR, CLEAR_USER, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from './types';

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
    // dispatch({ type: CLEAR_APPLICATION});
    // dispatch({ type: CLEAR_COMPLAINTS});
    
};