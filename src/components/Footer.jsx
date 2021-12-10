import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'

const Footer = ({ theme, lightTheme, darkTheme }) => {
  return (
    <Box bgcolor='primary.main' color='primary.contrastText' py={4}>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center'>
            <img
              src={theme === lightTheme ? logoDark : logo}
              width='65'
              alt='Founders Logo'
            />
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
