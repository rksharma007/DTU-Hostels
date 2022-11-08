import axios from "axios";
import { getMyApplication } from "./application";
import { loadStudent } from "./auth";
import { getMyRoom } from "./room";
import { CHECKOUT, FEE_ERROR, GET_FEES, GET_KEY, LOAD_RECEIPTS } from './types';


// Get key
export const getKey = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get('/api/fees/getKey', config);

        dispatch({
            type: GET_KEY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Checkout
export const checkout = (amount) => async dispatch => {
    try {
        const res = await axios.post('/api/fees/checkout', {amount});
        dispatch(loadStudent());
        dispatch(getMyApplication());
        dispatch(getMyRoom());
        dispatch({
            type: CHECKOUT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Get my receipts
export const getMyReceipts = (application_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get(`/api/fees/receipts/${application_id}`, config);

        dispatch({
            type: LOAD_RECEIPTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: FEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Get All Receipts
export const getAllFees = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.get('/api/fees', config);

        dispatch({
            type: GET_FEES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}