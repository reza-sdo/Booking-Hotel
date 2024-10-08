import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useBookMark } from '../context/BookmarkListContext';
import { Link, useSearchParams } from 'react-router-dom';

const Bookmark = () => {
  const { bookmarks, isLoading, currentBookmark } = useBookMark();

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <h2>bookmark list</h2>

      <div className="bookmarkList">
        {bookmarks?.map((bookmark) => (
          <Link
            key={bookmark.id}
            to={`${bookmark.id}/?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                bookmark.id === currentBookmark?.id ? 'current-bookmark' : ''
              }`}
            >
              <ReactCountryFlag svg countryCode={bookmark.countryCode} />
              &nbsp;
              <strong>{bookmark.cityName}</strong>
              &nbsp;
              <span>{bookmark.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
