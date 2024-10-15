import React, { createContext, useContext, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookMarkContext = createContext();
const BASE_URL = 'http://localhost:5000';

// const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);

const BookmarkListProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);
  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    setIsLoading(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    setIsLoading(true);
    // setCurrentBookmark(null);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setBookmarks((pre) => [...pre, data]);
      toast.success('بوک مارک جدید ساخته شد');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    setIsLoading(true);
    // setCurrentBookmark(null);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((pre) => pre.filter((item) => item.id !== id));
      toast.success('بوک مارکه پاک شد ');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        setIsLoading,
        currentBookmark,
        createBookmark,
        deleteBookmark,
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
