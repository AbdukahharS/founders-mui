import React from 'react'
import banner from '../images/header.png'
// import '../css/header.css'
import { Container, Box, Stack, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box bgcolor='primary.dark' color='primary.contrastText'>
      <Container>
        <Stack direction='row' alignItems='center' spacing={4} pt={4} pb={6}>
          <Box>
            <Typography variant='h4' mb={2} fontWeight={500}>
              Bill Gates, Elon Musk, Warren Buffet — ingliz tilisiz asoschi
              asoschi emas,
            </Typography>
            <Typography variant='h5'>
              «Founders School» da o’qimagan asos sola olmas 😎
            </Typography>
          </Box>
          <img src={banner} alt='SVG Banner' style={{ maxWidth: '50%' }} />
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
