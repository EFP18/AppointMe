import { Box, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from './theme';
import PhoneImg from '../assets/img/phone.png';
import HelpImg from '../assets/img/help.png';

const FooterContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: colors.grey,
  color: colors.black,
  padding: '20px',

});

function Footer() {
  return (
    <FooterContainer>
      <Grid 
        container 
        spacing={2} 
        alignItems='center' 
        justifyContent='center'  
      >
        <Grid item>
          <img src={PhoneImg} alt='phone' style={{width: '20px', marginRight: '8px'}} /> 
          <Typography variant="body1" component='span'>  
            555-555-5555
          </Typography>
        </Grid>
        <Grid item>
          <img src={HelpImg} alt='help' style={{width: '20px', marginRight: '8px'}} />  
          <Link
            href='mailto:info@appointme.com'
            underline='none'
            variant="body1" 
            style={{ color: colors.black }}
          >
            info@appointme.com
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" style={{marginTop: '10px'}}>
        © 2023 AppointMe
      </Typography>
    </FooterContainer>
  );
}

export default Footer;
