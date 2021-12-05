import React from 'react'
import banner from '../images/header.png'
// import '../css/header.css'
import { Container, Box, Stack, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box bgcolor='primary.main' color='primary.contrastText'>
      <Container>
        <Stack direction='row' alignItems='center' spacing={4} pt={4} pb={8}>
          <Box>
            <Typography variant='h3' mb={2} fontWeight={500}>
              We Grow Together!
            </Typography>
            <Typography variant='h5'>
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </Typography>
          </Box>
          <img src={banner} alt='SVG Banner' style={{ maxWidth: '50%' }} />
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
