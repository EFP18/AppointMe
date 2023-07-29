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

export default function ServicePage() {
  // grab the value of service from useParams to dynamically create the title of each service page
  const { service } = useParams();

  return (
    <Page>
      <Header />
      <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
        {/* Use the selectedIndustry state to display the dynamically updated title */}
        <Typography variant='h5'>{service}</Typography>

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
              Vendor Name
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Vendor's Bio
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Share</Button>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Page>
  );
}
