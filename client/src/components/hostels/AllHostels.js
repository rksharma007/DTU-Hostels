import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getHostels } from '../../actions/hostel';
import HostelItem from './HostelItem';

const AllHostels = ({
  auth,
  getHostels,
  hostel: {hostels},
  showActions
}) => {

  useEffect(() => {
    getHostels();
  }, [getHostels]);

  return (
    <table style={{marginTop: '2rem'}} className='table'>
      <thead>
        <tr>
          <td>Date</td>
          <td>Name</td>
          <td>Type</td>
          <td>Warden Name</td>
          <td>Warden Mobile</td>
        </tr>
      </thead>
      <tbody>
        {hostels.map(hostel => (
            <HostelItem key={hostel._id} hostel={hostel} />
        ))}
      </tbody>
    </table>
  )
}

AllHostels.propTypes = {
  getHostels: propTypes.func.isRequired,
  hostel: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  hostel: state.hostel
})

export default connect(mapStateToProps, { getHostels })(AllHostels);