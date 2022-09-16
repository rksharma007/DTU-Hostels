import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addHostel } from '../../actions/hostel';


const AddHostel = ({addHostel}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    wardenname: '',
    wardencontact: '',
  })

  const {
    name,
    gender,
    wardenname,
    wardencontact,
   } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
      addHostel(formData, navigate);
  };

  return (
    <>
    <h3 style={{color:'#17a2b8', marginTop:'1rem'}}> New Hostel Information</h3>
    
    <div className="post-form" style={{marginLeft: '200px', marginRight: '200px'}}>
        <form className="form" onSubmit={ e => onSubmit(e)}>
      
      <label>Name:<input type='text' placeholder='Hostel Name' name="name" value={name} required onChange={e => onChange(e)} /></label>
      <label>Type: 
        <select id="gender" name="gender" value={gender} size="1" required onChange={e => onChange(e)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </label>
      <label>Warden Name:<input type='text' placeholder='Warden Name' name="wardenname" value={wardenname} required onChange={e => onChange(e)} /></label>
      <label>Warden Contact:<input type='text' placeholder='Warden Contact' name="wardencontact" value={wardencontact} required onChange={e => onChange(e)} /></label>
    
      <input type="submit" style={{marginTop: '1rem', marginBottom: '2rem'}} className="btn btn-primary" value="Add Hostel" /> 
      
      </form>
    </div>
    </>
  )
}

AddHostel.propTypes = {
  addHostel: propTypes.func.isRequired,
};

export default connect(null, { addHostel })(AddHostel);