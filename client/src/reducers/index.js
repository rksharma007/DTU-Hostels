import { combineReducers } from "redux";
import alert from './alert';
import application from './application';
import auth from './auth';
import complaint from './complaint';
import fee from './fee';
import hostel from './hostel';
import notice from './notice';
import room from './room';
import student from './student';

export default combineReducers({
    alert,
    auth,
    complaint,
    application,
    hostel,
    room,
    student,
    fee,
    notice
});