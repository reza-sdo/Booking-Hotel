import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useHotels } from '../context/HotelsProvider';

const Hotels = () => {
  const { isLoading, hotels } = useHotels();
  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className="searchList">
      <h2>Search Result ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div className="searchItem">
            <img src={item.thumbnail_url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                € &nbsp; {item.price} &nbsp; <span>night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Hotels;
