import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import StockPhoto from '../pages/ProfileView/img/stock-photo.png';
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
import { colors } from './theme';

export default function ServiceCard({ id, name, description, image }) {
  // If no image is provided, use the default StockPhoto
  const displayImage = image || StockPhoto;

  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={`/clientview/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
          height: 400,
          margin: '20px',
          marginBottom: 3,
          transition: '0.3s',
          color: colors.black,
          '&:hover': {
            backgroundColor: colors.primary,
            color: colors.white,
            boxShadow: colors.shadow,
          },
        }}
      >
        <CardMedia
          component='img'
          alt='vendor-image'
          height='150'
          image={displayImage}
          style={{ objectFit: 'contain', marginTop: '20px' }}
          
        />
        <CardContent sx={{ padding: 2, flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{ fontSize: '24px', marginBottom: '16px', textAlign: 'left' }}
          >
            {name}
          </Typography>
          <Typography
            variant='body2'
            sx={{ fontSize: '14px', marginBottom: '16px', textAlign: 'left' }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '16px',
          }}
        >
          <Typography
            size='small'
            sx={{
              fontSize: '16px',
              textAlign: 'left',
              color: hover ? colors.white : colors.black,
            }}
          >
            SHARE
          </Typography>
          <div>
            {/* dynamic creation of urls  */}
            <WhatsappShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          <div>
            <FacebookMessengerShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </div>
          <div>
            <LinkedinShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
          <div>
            <TelegramShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
          <div>
            <TwitterShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </CardActions>
      </Card>
    </Link>
  );
}
