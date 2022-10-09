import {
    ADMIN_LOADED, AUTH_ERROR, CLEAR_USER, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loading: true
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case CLEAR_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}

