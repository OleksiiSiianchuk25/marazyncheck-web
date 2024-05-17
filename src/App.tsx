import React, { useState } from 'react';
import NavBar from './components/Nav/NavBar';
import Footer from './components/Footer/Footer';
import ShopMain from './components/Shop/ShopMain';
import Faq from './components/FAQ/Faq';
import UserPage from './components/User/UserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className='App'>
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<ShopMain searchQuery={searchQuery} />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/user" element={<UserPage />}/>
          <Route path="/order-history" element={<UserPage />}/>
          <Route path="/logout" element={<UserPage />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
