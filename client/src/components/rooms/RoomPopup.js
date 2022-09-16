
import React from "react";
 
const RoomPopup = props => {
  return (
    <td>
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
    </td>
  );
};

export default RoomPopup;