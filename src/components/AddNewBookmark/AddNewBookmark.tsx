import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../hooks/useUrlLocation';

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const { lat, lng } = useUrlLocation();

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">cityName:</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country:</label>
          <input type="text" name="country" id="country" />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
