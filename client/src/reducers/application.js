import {
    ADD_APPLICATION,
    ALLOT_APPLICATION,
    APPLICATION_ERROR,
    APPROVE_APPLICATION,
    CLEAR_APPLICATION,
    DELETE_APPLICATION,
    GET_APPLICATIONS,
    GET_MY_APPLICATION,
    REJECT_APPLICATION, UNALLOT_APPLICATION, VERIFY_APPLICATION
} from '../actions/types';

const initialState = {
    application: null,
    applications: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case APPLICATION_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };
        case ADD_APPLICATION:
            return {
                ...state,
                applications: [payload, ...state.applications],
                loading: false
            };
        case GET_MY_APPLICATION:
            return {
                ...state,
                applications: payload,
                loading: false,
            };
        case GET_APPLICATIONS:
            return {
                ...state,
                applications: payload,
                loading: false,
            };
        case REJECT_APPLICATION:
            return {
                ...state,
                applications: state.applications.map(application => application._id === payload.id ? { ...application, status: payload.status } : application),
                loading: false,
            };
        case APPROVE_APPLICATION:
            return {
                ...state,
                applications: state.applications.map(application => application._id === payload.id ? { ...application, status: payload.status } : application),
                loading: false,
            };
        case VERIFY_APPLICATION:
            return {
                ...state,
                applications: state.applications.map(application => application._id === payload.id ? { ...application, status: payload.status } : application),
                loading: false,
            };
        case ALLOT_APPLICATION:
            return {
                ...state,
                applications: [payload, ...state.applications],
                loading: false,
            };
        case UNALLOT_APPLICATION:
            return {
                ...state,
                applications: state.applications.map(application => application._id === payload.id ? { ...application, status: payload.status } : application),
                loading: false,
            };
        case CLEAR_APPLICATION:
            return {
                ...state,
                applications: null,
                loading: false,
            };
        case DELETE_APPLICATION:
            return {
                ...state,
                applications: state.applications.filter(application => application._id !== payload),
                loading: false
            };
        default:
            return state;
    }
};