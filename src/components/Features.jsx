import { Box, Container, Stack, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import Slider from './Slider'
// DB
import features from '../db/features'

const Features = ({ isMobile, theme, language }) => {
  return (
    <Box
      id='features'
      pt={6}
      pb={isMobile ? 6 : 12}
      bgcolor={theme.palette.mode === 'dark' && 'primary.main'}
      sx={
        theme.palette.mode === 'dark'
          ? { backgroundColor: 'primary.main' }
          : { backgroundImage: theme.palette.background }
      }
      color='primary.contrastText'
    >
      <Container>
        <Typography variant='h2' color='secondary' fontWeight={700}>
          {language.features.heading}
        </Typography>
        {!isMobile ? (
          <Grid container pt={4} px={2} spacing={4}>
            {features.map((feature, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Stack alignItems='center' justifyContent='center'>
                  <feature.icon sx={{ fontSize: '8rem' }} />
                  <Typography fontSize='1.4rem' textAlign='center'>
                    {feature.description}
                  </Typography>
                  {feature.link && (
                    <Link
                      to={feature.link.path}
                      style={{
                        textDecoration: 'underline',
                        fontSize: '1.4rem',
                        color: 'secondary.main',
                      }}
                    >
                      {feature.link.name}
                    </Link>
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack>
            <Slider items={features} />
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default Features
