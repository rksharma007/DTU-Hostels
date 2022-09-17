import propTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { addNotice } from '../../actions/notice';


const AddNotice = ({addNotice}) => {

  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
      const { title, description } = state;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      //console.log(formData.get('file'));
      addNotice(formData);
  };

  return (
    <div className='container'>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <label>Title:<input type='text' placeholder='Notice title' name="title" value={state.title || ''} required onChange={onChange} /></label>
        <label>Description:<input type='text' placeholder='Description' name="description" value={state.description || ''} required onChange={onChange} /></label>

        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p className='lead' style={{color: 'grey', borderStyle:'solid', borderWidth:'1px', marginTop:'20px'}}>
                  Drag and drop a file OR click here to select a file
                </p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p className='small' style={{color: 'grey', borderStyle:'solid', borderWidth:'1px', marginTop:'20px'}}>
                Preview for .jpg/.jpeg/.png images
              </p>
            </div>
          )}
        </div>
        <input type="submit" style={{marginTop: '1rem', marginBottom: '2rem'}} className="btn btn-success" value="Upload Notice" /> 
      </form>
    </div>
  );
};

AddNotice.propTypes = {
  addNotice: propTypes.func.isRequired,
};


export default connect(null, {addNotice})(AddNotice);
