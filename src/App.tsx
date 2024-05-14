import React from 'react';
import NavBar from './components/Nav/NavBar';
import Footer from './components/Footer/Footer'
import ShopMain from './components/Shop/ShopMain';
import Faq from './components/FAQ/Faq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes> // Use Routes instead of Switch
          <Route path="/" element={<ShopMain />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
