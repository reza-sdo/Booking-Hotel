import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookMark } from '../context/BookmarkListContext';
import ReactCountryFlag from 'react-country-flag';

const SingleBookMark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookMark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const backHandler = () => {
    navigate(-1);
  };
  if (isLoadingCurrentBookmark || !currentBookmark) return <h1>loading...</h1>;
  return (
    <div>
      <button onClick={backHandler} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />{' '}
        <br />
        <p>{currentBookmark.country}</p>
      </div>
    </div>
  );
};

export default SingleBookMark;
