import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import VendorProfile from "./pages/VendorProfile/VendorProfile";
import ProfileView from "./pages/ProfileView/ProfileView";
import LandingPage from "./pages/LandingPage/LandingPage";
import ClientDb from "./pages/ClientDb/ClientDb";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  // Google Account signin integration
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    setUser(userObj);

    // if user not yet logged in, show SIGN IN Button
    // if user exists, show LOG OUT button
    document.getElementById("signInButton").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "14362999735-d6did93g2g0t0nipqoq7ge2pu2tuu2bu.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInButton"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="App">
      {/* <LandingPage /> */}
      <Login />
      {/* <Signup /> */}
      {/* <CalendarPage /> */}
      {/* <VendorProfile /> */}
      {/* <ProfileView /> */}
      <ClientDb />
    </div>
  );
}

export default App;
