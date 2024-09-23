import React from 'react';
import Map from '../Map/Map';

function BookMark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        <div>bookmark list</div>
      </div>
      <Map />
    </div>
  );
}

export default BookMark;
