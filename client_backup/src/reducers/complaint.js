import { ADD_COMPLAINT, CLEAR_COMPLAINTS, COMPLAINT_ERROR, DELETE_COMPLAINT, GET_MY_COMPLAINTS } from '../actions/types';

const initialState = {
    complaint: null,
    complaints: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case COMPLAINT_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };

        case ADD_COMPLAINT:
            return {
                ...state,
                complaints: [payload, ...state.complaints],
                loading: false
            };
        case GET_MY_COMPLAINTS:
            return {
                ...state,
                complaints: payload,
                loading: false,
            };
        case CLEAR_COMPLAINTS:
            return {
                ...state,
                complaints: null,
                loading: false,
            };
        case DELETE_COMPLAINT:
            return {
                ...state,
                complaints: state.complaints.filter(complaint => complaint._id !== payload),
                loading: false
            };
        default:
            return state;
    }
};