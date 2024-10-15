import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useBookMark } from '../context/BookmarkListContext';
import { Link, useSearchParams } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';

const Bookmark = () => {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookMark();
  const handelDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading) return <h1>loading...</h1>;
  if (!bookmarks.length) return <p>there is no data</p>;
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
              <div>
                <ReactCountryFlag svg countryCode={bookmark.countryCode} />
                &nbsp;
                <strong>{bookmark.cityName}</strong>
                &nbsp;
                <span>{bookmark.country}</span>
              </div>
              <button onClick={(e) => handelDelete(e, bookmark.id)}>
                <HiTrash className="trash" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
