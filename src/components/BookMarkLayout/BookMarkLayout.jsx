import React from 'react';
import Map from '../Map/Map';
import { Outlet } from 'react-router-dom';
import { useBookMark } from '../context/BookmarkListContext';

function BookMarkLayout() {
  const { bookmarks } = useBookMark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
        {/* <div>bookmark list</div> */}
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
}

export default BookMarkLayout;
