import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;
  console.log(room);

  console.log(destination);
  const { isLoading, data } = useFetch(
    'http://localhost:5000/hotels',
    `q=${
      destination || ''
    }&accommodates_gte=${room || 1}`
  );
  console.log(data);

  if (isLoading) return <h1>loading...</h1>;
  return <div>{data.length}</div>;
};

export default Hotels;
