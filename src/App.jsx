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

function App() {
  return (
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
          <Route path="/bookmark" element={<BookMarkLayout />}>
            <Route index element={<div> bookmark </div>} />
            <Route path="add" element={<div>form add new bookmark</div>} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkListProvider>
  );
}

export default App;
