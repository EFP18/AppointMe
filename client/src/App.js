import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import VendorProfile from './pages/VendorProfile/VendorProfile';
import ProfileView from './pages/ProfileView/ProfileView';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import header and footer

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <Header></Header> */}
        {/* conditionally rendered routes */}
        <Routes>
          {/* endpoints */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/calendarpage' element={<CalendarPage />} />
          <Route path='/vendorprofile' element={<VendorProfile />} />
          <Route path='/profileview' element={<ProfileView />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
