import { React, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// Import the Link component for routing
import "./LandingPage.css";
import SearchBox from "../../components/SearchBox";
import Page from "../../components/Page";
import appointme from "../../images/appointme-lowercase-small.png";
import appointmeLogo from "../../images/appointme-logo.png";
import services from "../../data/services";
// Import the service pages
import MusicServicePage from "../ServicesPages/MusicServicePage";

function LandingPage() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceNavigation = () => {
    if (selectedService) {
      switch (selectedService.type) {
        case "Music":
          return <MusicServicePage />;
        default:
          return null;
      }
    }
  };

  return (
    <Page title={"AppointMe"} className="landing-page">
      <img className="" src={appointmeLogo} alt="appointme-logo" style={{}} />
      <img className="" src={appointme} alt="appointme-text" style={{}} />
      <div className="login-signup-button">
        {/* button leads to signup page */}
        <Button
          variant="contained"
          color="primary"
          accessibilityLabel="signup/login button"
          // Use Link component instead of href
          component={Link}
          // URL to navigate when the button is clicked
          to='/login'
        >
          Sign Up / Login
        </Button>
      </div>
      <div className="search-bar">
        <SearchBox
          details={services}
          // Update the setSelectedService when a service is selected
          onSelect={(service) => setSelectedService(service)}
        />
      </div>
      {/* Render the selected service page */}
      {handleServiceNavigation()};<div>space for image</div>
      <div>
        Text about us, business model, link to contact us page? What we are, who
        we are, services we offer, description of app.
      </div>
    </Page>
  );
}

export default LandingPage;
