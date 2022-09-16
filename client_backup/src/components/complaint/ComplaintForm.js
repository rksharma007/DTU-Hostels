import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComplaint } from '../../actions/complaint';


const ComplaintForm = ({addComplaint}) => {
  const [text, setText] = useState('')

  return (
    <div className="post-form">
        <form className="form my-1" onSubmit={e => {
              e.preventDefault();
              addComplaint({ text });
              setText('');
          }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Write here.."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <input type="submit" className="btn btn-primary my-1" value="Submit" />
        </form>
    </div>
  )
}

ComplaintForm.propTypes = {
  addComplaint: propTypes.func.isRequired,
};

export default connect(null, { addComplaint })(ComplaintForm);