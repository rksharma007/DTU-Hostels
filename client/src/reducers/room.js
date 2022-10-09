import { ADD_ROOM, DELETE_ROOM, GET_MY_ROOM, GET_ROOMS, REMOVE_STUDENT, ROOM_ERROR } from '../actions/types';

const initialState = {
    room: null,
    rooms: [],
    loading: true,
    error: {}
}

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ROOM_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };

        case ADD_ROOM:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            };
        case GET_MY_ROOM:
            return {
                ...state,
                rooms: payload,
                loading: false,
            };
        case GET_ROOMS:
            return {
                ...state,
                rooms: payload,
                loading: false,
            };
        case REMOVE_STUDENT:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false,
            };
        case DELETE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== payload),
                loading: false
            };
        default:
            return state;
    }
};