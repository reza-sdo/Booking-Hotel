import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../hooks/useUrlLocation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactCountryFlag from 'react-country-flag';
import { useBookMark } from '../context/BookmarkListContext';

const BASE_GEOCODING_URL = 'https://api-bdc.net/data/reverse-geocode-client';

const AddNewBookmark = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(false);
  const navigate = useNavigate();
  const { lat, lng } = useUrlLocation();
  const { createBookmark } = useBookMark();

  useEffect(() => {
    if (!lat || !lng) {
      toast.error('طول و عرض جغرافیایی موجود نیست');
      return;
    }
    async function fetchLocationData() {
      setGeoCodingError(false);
      setIsLoadingGeocoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error('این مکان شهر نیست و کشوری برای این مکان ثبت نشده');
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || data.principalSubdivision || '');
        setCountryCode(data.countryCode);
      } catch (error) {
        console.log(error);

        setGeoCodingError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + ' ' + country,
    };
    await createBookmark(newBookmark);
    navigate('/bookmark/');
  };

  if (isLoadingGeocoding) return <h1>loading...</h1>;
  if (geoCodingError) return <p>{geoCodingError}</p>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="cityName">cityName:</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">
            <ReactCountryFlag svg countryCode={countryCode} />
          </span>
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
