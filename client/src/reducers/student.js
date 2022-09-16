import {
    GET_STUDENTS, STUDENT_ERROR
} from '../actions/types';

const initialState = {
    student: null,
    students: [],
    loading: true,
    error: {}
}


export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: payload,
                loading: false,
            };
        case STUDENT_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}

