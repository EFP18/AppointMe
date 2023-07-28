import * as React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import musicImg from '../../images/music.jpg';
import Page from '../../components/Page';
import Header from '../../components/Header';
// import services from '../../data/services';
import SearchBox from '../../components/SearchBox';
import { useState } from 'react';

export default function MusicServicePage({ selectedIndustry }) {
  return (
    <Page>
      <Header />
      <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
        {/* Use the selectedIndustry state to display the dynamically updated title */}
        <h1>'Industry Title'</h1>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component='img'
            alt='music-image'
            height='150'
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
