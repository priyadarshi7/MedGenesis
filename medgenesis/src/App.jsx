import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import ProfilePage from './components/profile/Profile';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />\
        <Route path="/profile/:auth0Id" element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App;