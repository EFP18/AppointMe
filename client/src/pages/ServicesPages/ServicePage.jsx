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

  const { loading, data } = useQuery(GET_BUSINESSES);
  // const businessData = data?.business || [];
  console.log(data);
  const businessData = data?.businesses || [];
  // console.log(businessData)
  // Filter businesses based on the service tag
  const filteredBusinesses = businessData.filter((business) => {
    if (business.tags && typeof business.tags === 'object') {
      return business.tags.name === service;
    }
    return false;
  });

  console.log(filteredBusinesses);
  return (
    <Page
      title={`${service} - AppointMe`}
      sx={{ backgroundColor: colors.grey }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          margin: '20px 10px',
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.white,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            margin: 'auto',
            boxShadow: colors.shadow,
            borderRadius: '15px',
            padding: '16px',
          }}
        >
          {/* Use the selectedIndustry state to display the dynamically updated title */}
          <Typography
            variant='h2'
            sx={{
              display: 'flex',
              textAlign: 'left',
              fontSize: '50px',
              fontFamily: 'League Spartan',
              // marginLeft: '100px',
            }}
          >
            {service}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '30px',
            }}
            >
            {/* Generate a ServiceCard for every service in database */}
            {filteredBusinesses.map((business, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ margin: '10px' }}
              >
                <ServiceCard
                  name={business.name}
                  description={business.description}
                  image={business.image}
                />
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
