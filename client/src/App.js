import React from 'react';
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import CalendarPage from './pages/CalendarPage/CalendarPage'
import VendorProfile from './pages/VendorProfile/VendorProfile';
import ProfileView from './pages/ProfileView/ProfileView';
import LandingPage from './pages/LandingPage/LandingPage';
import ClientDb from './pages/ClientDb/ClientDb';

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <CalendarPage /> */}
      {/* <VendorProfile /> */}
     {/* <ProfileView /> */}
     <ClientDb />
    </div>
  );
}

export default App;
