import React from "react";

function ReceivedRequests(props) {
  return (
    <div className="received">
      <h1>No Received requests</h1> 
      <span onClick={props.checkRequests}>See sent Requests</span>
    </div>
  )
}

export default ReceivedRequests;