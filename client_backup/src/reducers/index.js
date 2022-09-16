import { combineReducers } from "redux";
import alert from './alert';
import application from './application';
import auth from './auth';
import complaint from './complaint';

export default combineReducers({
    alert,
    auth,
    complaint,
    application
});