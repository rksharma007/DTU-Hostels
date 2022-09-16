import { ADD_HOSTEL, DELETE_HOSTEL, GET_HOSTELS, HOSTEL_ERROR } from '../actions/types';

const initialState = {
    hostel: null,
    hostels: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case HOSTEL_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };

        case ADD_HOSTEL:
            return {
                ...state,
                hostels: [payload, ...state.hostels],
                loading: false
            };
        case GET_HOSTELS:
            return {
                ...state,
                hostels: payload,
                loading: false,
            };
        case DELETE_HOSTEL:
            return {
                ...state,
                hostels: state.hostels.filter(hostel => hostel._id !== payload),
                loading: false
            };
        default:
            return state;
    }
};