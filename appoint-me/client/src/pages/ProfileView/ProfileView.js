import React from 'react';
import { Button } from '@mui/material';
import youtubeLogo from './img/youtube.png'
import facebookLogo from './img/facebook.png'
import instagramLogo from './img/instagram.png'
import linkedInLogo from './img/linkedin.png'
import tiktokLogo from './img/tik-tok.png'

function ProfileView(props) {
  const {
    name = 'Test Name',
    description = 'Test Description',
    imageUrl,
    youtubeUrl = "www.youtube.com",
    facebookUrl = "www.facebook.com",
    instagramUrl,
    linkedInUrl,
    tiktokUrl,
    email = 'test@yahoo.com',
    services = [
      {
        name: 'Guitar Lesson',
        price: 30
      },
      {
        name: 'Piano Lesson',
        price: 25
      }
    ],
    availability,
    tags = 'Music'
  } = props;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      
      {imageUrl && <img src={imageUrl} alt="Vendor" />}
      
      {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer"><img src={facebookLogo} alt="Facebook" /></a>}
      {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"><img src={youtubeLogo} alt="YouTube" /></a>}
      {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer"><img src={instagramLogo} alt="Instagram" /></a>}
      {linkedInUrl && <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><img src={linkedInLogo} alt="LinkedIn" /></a>}
      {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer"><img src={tiktokLogo} alt="TikTok" /></a>}
      
      {email && <p>Email: {email}</p>}
      
      <h2>Services</h2>
      {services.length > 0 ? (
        services.map((service, index) => (
          <div key={index}>
            <p>Service: {service.name}</p>
            <p>Price: {service.price}</p>
          </div>
        ))
      ) : (
        <p>No services listed.</p>
      )}
      
      <h2>Availability</h2>
      {/* Render availability based on its structure */}
      
      {tags && <p>Category: {tags}</p>}

      <Button variant="contained" fullWidth>View Profile</Button>
    </div>
  );
}

export default ProfileView;
