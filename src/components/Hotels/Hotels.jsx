import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;
  console.log(room);

  console.log(destination);
  const { isLoading, data } = useFetch(
    'http://localhost:5000/hotels',
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );
  console.log(data);

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className="searchList">
      <h2>Search Result ({data.length})</h2>
      {data.map((item) => (
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
