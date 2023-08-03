import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard';
import { colors } from '../../components/theme';
import { GET_BUSINESSES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function ServicePage() {
  const { service } = useParams();

  // Mock service data
  // const businessData = [
  //   {
  //     name: 'Vendor 1',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   },
  //   {
  //     name: 'Vendor 2',
  //     description:
  //       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  //     // image: 'image2.jpg', If empty stock img will appear
  //   },
  //   {
  //     name: 'Vendor 3',
  //     description:
  //       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  //     // image: 'image2.jpg', If empty stock img will appear
  //   },
  // ];

  const {loading, data} = useQuery(GET_BUSINESSES);
  const businessData = data?.business || [];

  return (
    <Page sx={{ backgroundColor: colors.grey }}>
      <Header />
      <Box sx={{ marginLeft: '100px', flexGrow: 1, margin: '40px 0' }}>
        {/* Use the selectedIndustry state to display the dynamically updated title */}
        <Typography
          variant='h2'
          sx={{
            textAlign: 'left',
            fontSize: '50px',
            fontFamily: 'League Spartan',
            marginLeft: '100px',
          }}
        >
          {service}
        </Typography>

        {/* Generate a ServiceCard for every service in database */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '30px',
          }}
        >
          {businessData.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ margin: '10px' }}
            >
              <ServiceCard
                  name={service.name}
                  description={service.description}
                  image={service.image}
                />
              {/* {businessData.map((business) => {

                <ServiceCard
                  name={business.name}
                  description={business.description}
                  image={business.image}
                />
              })} */}
            </Grid>
          ))}
        </Box>
      </Box>
    </Page>
  );
}
