import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookMarkContext = createContext();
const BASE_URL = 'http://localhost:5000';

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'bookmarks/loaded':
      return { ...state, bookmarks: action.payload, isLoading: false };
    case 'bookmark/loaded':
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case 'bookmark/created':
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case 'bookmark/deleted':
      return {
        ...state,
        isLoading: false,
        currentBookmark: null,
        bookmarks: state.bookmarks.filter((bm) => bm.id !== action.payload),
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const BookmarkListProvider = ({ children }) => {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: 'loading' });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        // setBookmarks(data);
        dispatch({ type: 'bookmarks/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
        toast.error(error.message);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if(Number(id) === currentBookmark?.id) return 
    dispatch({ type: 'loading' });
    // dispatch({ type: 'bookmark/loaded', payload: null });
    // setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: 'bookmark/loaded', payload: data });

      // setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: 'loading' });
    // setIsLoading(true);
    // setCurrentBookmark(null);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      // setBookmarks((pre) => [...pre, data]);
      dispatch({ type: 'bookmark/created', payload: data });
      toast.success('بوک مارک جدید ساخته شد');
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    // setIsLoading(true);
    dispatch({ type: 'loading' });

    // setCurrentBookmark(null);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: 'bookmark/deleted', payload: id });
      // setBookmarks((pre) => pre.filter((item) => item.id !== id));
      toast.success('بوک مارکه پاک شد ');
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: 'rejected', payload: error.message });
    }
  }
  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        // setIsLoading,
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
