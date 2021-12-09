import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import logo from './../images/logo.png'

const Footer = () => {
  return (
    <Box bgcolor='primary.main' color='primary.contrastText' py={4}>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center'>
            <img src={logo} alt='Founders Logo' width='80px' />
            <Stack
              direction='column'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <h3>FOUNDERS</h3>
              <h5>LANGUAGE</h5>
              <h5>SCHOOL</h5>
            </Stack>
          </Stack>
          <Typography variant='h4'>
            Copyright © 2021 Founders Language School
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
