import * as React from 'react';
import Header from '../../components/Header';
import './LandingPage.css';
import Page from '../../components/Page';
import appointmeLogo from '../../images/appointme-logo.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import peopleWorking from '../../images/laptops-working.jpg';
import { Link } from 'react-router-dom';

function LandingPage() {
  // const [selectedService, setSelectedService] = useState(null);

  return (
    <Page title={'AppointMe'} className='landing-page'>
      <Header />
      <Container maxWidth='sm'>
        {/* <img className='' src={appointmeLogo} alt='appointme-logo' style={{}} /> */}
        <img
          alt='people-working'
          src={peopleWorking}
          style={{ height: '220px', width: '90%' }}
        />
        <div>
          <h3> Welcome to AppointMe! </h3>
          <h4>A platform that combines it all! </h4>
          <p>
            AppointMe offers a place where vendors can create their own page
            with their services, and where they can organize their schedule. In
            turn, clients can access a vendor's profile, browse through the
            different services offered, and book them, using the integrated
            calendar that connects to a vendor's schedule. All that, under the
            same roof!
          </p>
          <h4> Who are we? </h4>
          <p>
            We are a group of friends who are about to start our careers as Web
            Developers, and saw a need in the market for a CRM for everyone,
            small and large business, as well as individuals, who need an
            accessible, easy-to-use website, that will help them acquire new
            clients, manage them, and keep track of their business analytics,
            all in one place.
          </p>
          <p>
            Vendors will also be able to accept payment from their client
            through our integrated Stripe system.
          </p>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image={appointmeLogo}
                alt='appointme-logo'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Contact Us
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Have any questions or technical difficulties?
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <ul className='contactus'>
                    <li>Give us a call at: 555-555-5555</li>
                    <li>
                      <div
                        onClick={(e) => {
                          window.location.href = 'mailto:info@appointme.com';
                        }}
                      >
                        Email us directly at info@appointme.com{' '}
                      </div>
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Container>
    </Page>
  );
}

export default LandingPage;
