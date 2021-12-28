import { Box, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
// DB
import features from '../db/features'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

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
        <Typography fontSize='3rem' color='secondary' fontWeight={700}>
          {language.features.heading}
        </Typography>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          autoPlaySpeed={2000}
        >
          {features.map((feature, i) => (
            <Stack
              alignItems='center'
              justifyContent='center'
              key={i}
              padding={2}
              paddingBottom={4}
            >
              <feature.icon sx={{ fontSize: '8rem' }} />
              <Typography fontSize='1.8rem' fontWeight={700}>
                {feature.name}
              </Typography>
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
          ))}
        </Carousel>
      </Container>
    </Box>
  )
}

export default Features
