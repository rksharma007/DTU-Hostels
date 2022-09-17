import { ADD_NOTICE, DELETE_NOTICE, GET_NOTICES, NOTICE_ERROR } from '../actions/types';

const initialState = {
    notice: null,
    notices: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case NOTICE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };
        case ADD_NOTICE:
            return {
                ...state,
                notices: [payload, ...state.notices],
                loading: false
            };
        case GET_NOTICES:
            return {
                ...state,
                notices: payload,
                loading: false,
            };
        case DELETE_NOTICE:
            return {
                ...state,
                notices: state.notices.filter(notice => notice._id !== payload),
                loading: false
            };
        default:
            return state;
    }
};