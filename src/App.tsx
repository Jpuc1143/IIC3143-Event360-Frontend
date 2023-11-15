import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Events from './pages/Events';



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
