import React, { createContext, useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookMarkContext = createContext();
const BASE_URL = 'http://localhost:5000';

// const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);

const BookmarkListProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }
  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        isLoadingCurrentBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
};

export default BookmarkListProvider;

export function useBookMark() {
  return useContext(BookMarkContext);
}
