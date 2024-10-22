import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import LocationList from './components/LocationList/LocationList';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Hotels from './components/Hotels/Hotels';
import HotelsProvider from './components/context/HotelsProvider';
import SingleHotel from './components/SingleHotel/SingleHotel';
import BookMarkLayout from './components/BookMarkLayout/BookMarkLayout';
import BookmarkListProvider from './components/context/BookmarkListContext';
import Bookmark from './components/Bookmark/Bookmark';
import SingleBookMark from './components/SingleBookMark/SingleBookMark';
import AddNewBookmark from './components/AddNewBookmark/AddNewBookmark';
import Login from './components/Login/Login';
import AuthProvider from './components/context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookMarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
              <Route path=":id" element={<SingleBookMark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
