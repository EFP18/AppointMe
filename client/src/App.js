import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import VendorProfile from './pages/VendorProfile/VendorProfile';
import ProfileView from './pages/ProfileView/ProfileView';
import ClientView from './pages/VendorPage-ClientView/ClientView';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import header and footer
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ClientDb from './pages/ClientDb/ClientDb';
// import MusicServicePage from './pages/ServicesPages/MusicServicePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import ServicePage from './pages/ServicesPages/ServicePage.jsx';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // Google Account signin integration
  // const [user, setUser] = useState({});
  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   var userObj = jwt_decode(response.credential);
  //   console.log(userObj);
  //   setUser(userObj);

  // if user not yet logged in, show SIGN IN Button
  // if user exists, show LOG OUT button
  //   document.getElementById('signInButton').hidden = true;
  // }
  // <GoogleLogin
  //   onSuccess={(credentialResponse) => {
  //     console.log(credentialResponse);
  //   }}
  //   onError={() => {
  //     console.log('Login Failed');
  //   }}
  // />;
  // signout
  // function handleSignOut(event) {
  //   setUser({});
  //   document.getElementById('signInButton').hidden = false;
  // }
  // useEffect(() => {
  /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       '14362999735-d6did93g2g0t0nipqoq7ge2pu2tuu2bu.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById('signInButton'), {
  //     theme: 'outline',
  //     size: 'large',
  //   });
  // }, []);

  return (
    <ApolloProvider client={client}>
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
            <Route path='/services/:service' element={<ServicePage />} />
            <Route path='/clientDb' element={<ClientDb />} />
            <Route path='/clientview' element={<ClientView />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
