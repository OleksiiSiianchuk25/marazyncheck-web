import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Nav/NavBar';
import Footer from './components/Footer/Footer';
import ShopMain from './components/Shop/ShopMain';
import Faq from './components/FAQ/Faq';
import UserPage from './components/User/UserPage';
import Login from './components/User/Login';
import Register from './components/User/Register';
import ProtectedRoute from './components/User/ProtectedRoute';  // Import the ProtectedRoute component
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const noNavBarFooterPaths = ['/login', '/register'];

  return (
    <div className='App'>
      {!noNavBarFooterPaths.includes(location.pathname) && <NavBar onSearch={handleSearch} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ShopMain searchQuery={searchQuery} />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/order-history" element={<UserPage />} />
          </Route>
        </Routes>
      {!noNavBarFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
