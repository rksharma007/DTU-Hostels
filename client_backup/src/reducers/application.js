import { ADD_APPLICATION, APPLICATION_ERROR, CLEAR_APPLICATION, DELETE_APPLICATION, GET_MY_APPLICATION } from '../actions/types';

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