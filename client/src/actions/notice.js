import axios from "axios";
import download from 'downloadjs';
import { setAlert } from "./alert";
import { ADD_NOTICE, DELETE_NOTICE, DOWNLOAD_NOTICE, GET_NOTICES, NOTICE_ERROR } from './types';


// Get notices
export const getNotices = () => async dispatch => {
    try {
      const res = await axios.get('/api/notices');
      dispatch({
        type: GET_NOTICES,
        payload: res.data
    });
    }
    catch (err) {
      dispatch({
          type: NOTICE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
      });
    }
  };


// Add Notice
export const addNotice = (formData) => async dispatch => {
    //console.log(formData.get('file'));
    const formD = {
        file: formData.get('file') ,
        title: formData.get('title') ,
        description: formData.get('description') 
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/notices/upload', formD, config);

        dispatch({
            type: ADD_NOTICE,
            payload: res.data
        });
        dispatch(setAlert('Uploaded a new notice', 'success'));
    } catch (err) {
        dispatch({
            type: NOTICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Download Notice
export const downloadNotice = (_id, path, mimetype) => async dispatch => {
    try {
        const res = await axios.get(`/api/notices/download/${_id}`, {
            responseType: 'blob'
        });
        
        const split = path.split('/');
        const filename = split[split.length - 1];
        
        dispatch({
            type: DOWNLOAD_NOTICE,
            payload: _id
        });

        download(res.data, filename, mimetype);
        dispatch(setAlert('Downloading a notice', 'success'));
    }
    catch (err) {
        dispatch({
            type: NOTICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Notice
export const deleteNotice = _id => async dispatch => {

    try {
        await axios.delete(`/api/notices/${_id}`);

        dispatch({
            type: DELETE_NOTICE,
            payload: _id
        });
        dispatch(setAlert('Deleted a notice', 'success'));
    } catch (err) {
        dispatch({
            type: NOTICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}