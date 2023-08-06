import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import VendorProfile from './pages/VendorProfile/VendorProfile';
import ProfileView from './pages/ProfileView/ProfileView';
import ClientView from './pages/VendorPage-ClientView/ClientView';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import ClientInfo from './pages/ClientInfo/ClientInfo';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import LandingPage from './pages/LandingPage/LandingPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientDb from './pages/ClientDb/ClientDb';
import GlobalStyle from './components/GlobalStyle';
import { setContext } from '@apollo/client/link/context';
import ServicePage from './pages/ServicesPages/ServicePage.jsx';
import { HelmetProvider } from 'react-helmet-async';
import authServiceInstance from './utils/auth';
import { colors } from './components/theme';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import AppointmentConfirm from './pages/AppointmentConfirm/AppointmentConfirm'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <div className='App'>
          <BrowserRouter>
            {/* <Header></Header> */}
            {/* conditionally rendered routes */}
            <Routes>
              {/* endpoints */}
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
             
    setBusiness({ ...business, category: selectedCategoryId });
              <Route path='/book-appointment' element={<BookAppointment />} />
              <Route path='/client-info' element={<ClientInfo />} />
              <Route path='/appointment-confirm' element={<AppointmentConfirm />} /> 
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </div>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
