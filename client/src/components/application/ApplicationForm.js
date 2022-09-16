import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addApplication } from '../../actions/application';

const ApplicationForm = ({ addApplication, history }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    gender: 'Male',
    roll: '',
    branch: '',
    semester: '',
    email: '',
    mobile: '',
    gradyear: '',
    fathername: '',
    fathermobile: '',
    mothername: '',
    mothermobile: '',
    localguardianname: '',
    localguardianmobile: '',
    nationality: '',
    permanentaddress_country: '',
    permanentaddress_state: '',
    permanentaddress_city: '',
    permanentaddress_addressline1: '',
    permanentaddress_addressline2: '',
    correspondenceaddress_country: '',
    correspondenceaddress_state: '',
    correspondenceaddress_city: '',
    correspondenceaddress_addressine1: '',
    correspondenceaddress_addressline: '',
  });

  const {
    fullname,
    gender,
    roll,
    branch,
    semester,
    email,
    mobile,
    gradyear,
    fathername,
    fathermobile,
    mothername,
    mothermobile,
    localguardianname,
    localguardianmobile,
    nationality,
    permanentaddress_country,
    permanentaddress_state,
    permanentaddress_city,
    permanentaddress_addressline1,
    permanentaddress_addressline2,
    correspondenceaddress_country,
    correspondenceaddress_state,
    correspondenceaddress_city,
    correspondenceaddress_addressline1,
    correspondenceaddress_addressline2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
      addApplication(formData, navigate);
  };

  return (
    <section className='container bg-white'>
      <p style={{color:'grey', textAlign:'right'}}> All fields are required</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
      <h3 style={{color:'#17a2b8', marginTop:'1rem'}}> Personal Information</h3>
      <label>Name:<input type='text' placeholder='Fullname' name="fullname" value={fullname} required onChange={e => onChange(e)} /></label>
      <label>Roll:<input type='text' placeholder='2KXX/XX/XXX' name="roll" value={roll} required onChange={e => onChange(e)} /></label>
      <label>Email:<input type='email' placeholder='DTU email' name="email" value={email} required onChange={e => onChange(e)} /></label>
      <label>Mobile:<input type='text' placeholder='10 digit mobile no.' name='mobile' value={mobile} required onChange={e => onChange(e)}/></label>
      <label>Gender: 
        <select id="gender" name="gender" value={gender} size="1" required onChange={e => onChange(e)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>Nationality:<input type='text' placeholder='E.g. Indian' name='nationality' value={nationality} required onChange={e => onChange(e)}/></label>
      <h3 style={{color:'#17a2b8', marginTop:'2rem'}}> Academic Information</h3>
      <label>Branch: 
        <select id="branch" name="branch" value={branch} size="1" required onChange={e => onChange(e)}>
          <option value="COE">COE</option>
          <option value="IT">IT</option>
          <option value="SE">SE</option>
          <option value="MCE">MCE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="EP">EP</option>
          <option value="PIE">PIE</option>
          <option value="CH">CH</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
          <option value="ENE">ENE</option>
          <option value="BT">BT</option>
        </select>
      </label>
      <label>Semester: 
        <select id="semester" name="semester" value={semester} size="1" required onChange={e => onChange(e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </label>
      <label>Graduation Year: 
        <select id="gradyear" name="gradyear" value={gradyear} size="1" required onChange={e => onChange(e)}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </label>
      <h3 style={{color:'#17a2b8', marginTop:'2rem'}}> Parent's Information</h3>
      <label>Father Name:<input type='text' placeholder='Father fullname' name='fathername' value={fathername} required onChange={e => onChange(e)}/></label>
      <label>Father Mobile:<input type='text' placeholder='Father mobile' name='fathermobile' value={fathermobile} required onChange={e => onChange(e)}/></label>
      <label>Mother Name:<input type='text' placeholder='Mother fullname' name='mothername' value={mothername} required onChange={e => onChange(e)}/></label>
      <label>Mother Mobile:<input type='text'placeholder='Mother mobile' name='mothermobile' value={mothermobile} required onChange={e => onChange(e)}/></label>
      <label>Guardian Name:<input type='text' placeholder='Guardian fullname' name='localguardianname' value={localguardianname} required onChange={e => onChange(e)}/></label>
      <label>Guardian Mobile:<input type='text' placeholder='Guardian mobile' name='localguardianmobile' value={localguardianmobile} required onChange={e => onChange(e)}/></label>
      <h3 style={{color:'#17a2b8', marginTop:'2rem'}}> Permanent Address</h3>
      <label>Address Line 1:<input type='text' placeholder='Address line 1' name='permanentaddress_addressline1' value={permanentaddress_addressline1} required onChange={e => onChange(e)}/></label>
      <label>Address Line 2:<input type='text' placeholder='Address line 2' name='permanentaddress_addressline2' value={permanentaddress_addressline2} required onChange={e => onChange(e)}/></label>
      <label>City:<input type='text' placeholder='City' name='permanentaddress_city' value={permanentaddress_city} required onChange={e => onChange(e)}/></label>
      <label>State:<input type='text' placeholder='State' name='permanentaddress_state' value={permanentaddress_state} required onChange={e => onChange(e)}/></label>
      <label>Country:<input type='text' placeholder='Country' name='permanentaddress_country' value={permanentaddress_country} required onChange={e => onChange(e)}/></label>
      <h3 style={{color:'#17a2b8', marginTop:'2rem'}}> Correspondence Address</h3>
      <label>Address Line 1:<input type='text' placeholder='Address line 1' name='correspondenceaddress_addressline1' value={correspondenceaddress_addressline1} required onChange={e => onChange(e)}/></label>
      <label>Address Line 2:<input type='text' placeholder='Address line 2' name='correspondenceaddress_addressline2' value={correspondenceaddress_addressline2} required onChange={e => onChange(e)}/></label>
      <label>City:<input type='text' placeholder='City' name='correspondenceaddress_city' value={correspondenceaddress_city} required onChange={e => onChange(e)}/></label>
      <label>State:<input type='text' placeholder='State' name='correspondenceaddress_state' value={correspondenceaddress_state} required onChange={e => onChange(e)}/></label>
      <label>Country:<input type='text' placeholder='Country' name='correspondenceaddress_country' value={correspondenceaddress_country} required onChange={e => onChange(e)}/></label>
      <p style={{marginTop: '1rem', color: 'red'}}>Do verify before final submission</p>
      <input type="submit" style={{marginTop: '1rem', marginBottom: '2rem'}} className="btn btn-primary" value="Submit Application" /> 
      
      </form>
    </section>
  )
}

ApplicationForm.propTypes = {
  addApplication: propTypes.func.isRequired
}

export default connect(null, {addApplication})(ApplicationForm);