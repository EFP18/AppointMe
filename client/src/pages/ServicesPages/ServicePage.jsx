import * as React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import musicImg from '../../images/music.jpg';
import Page from '../../components/Page';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

export default function ServicePage() {
  // grab the value of service from useParams to dynamically create the title of each service page
  const { service } = useParams();

  return (
    <Page>
      <Header />
      <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
        {/* Use the selectedIndustry state to display the dynamically updated title */}
        <Typography variant='h5'>{service}</Typography>
        {/* Conditionally create this card for every vendor of each industry, in the respective page */}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component='img'
            alt='vendor-image'
            height='150'
            // image should be each vendor's profile or logo image
            image={musicImg}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <Button href='/clientview' size='small'>
                Vendor Name
              </Button>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Vendor's Bio
            </Typography>
          </CardContent>
          {/* share a vendor's page on social media with react-share*/}
          <CardActions>
            <Button size='small'>
              Share
              <div>
                <WhatsappShareButton
                  // link should be the vendor page
                  url={'https://www.example.com'}
                  quote={'Dummy text!'}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div>
                <FacebookMessengerShareButton
                  // link should be the vendor page
                  url={'https://www.example.com'}
                  quote={'Dummy text!'}
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  // link should be the vendor page
                  url={'https://www.example.com'}
                  quote={'Dummy text!'}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
              <div>
                <TelegramShareButton
                  // link should be the vendor page
                  url={'https://www.example.com'}
                  quote={'Dummy text!'}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
              <div>
                <TwitterShareButton
                  // link should be the vendor page
                  url={'https://www.example.com'}
                  quote={'Dummy text!'}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Page>
  );
}
