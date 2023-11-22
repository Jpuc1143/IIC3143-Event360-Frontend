import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Events from './pages/Events';
import Tickets from './pages/Tickets';



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
