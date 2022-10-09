import { CHECKOUT, FEE_ERROR, GET_KEY, LOAD_RECEIPTS } from '../actions/types';

const initialState = {
    key: null,
    order: null,
    receipt: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case FEE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };
        case GET_KEY:
            return {
                ...state,
                key: payload,
                loading: false,
            };
        case CHECKOUT:
            return {
                ...state,
                order: payload,
                loading: false,
            };
        case LOAD_RECEIPTS:
            return {
                ...state,
                receipt: payload,
                loading: false,
            };
        default:
            return state;
    }
};