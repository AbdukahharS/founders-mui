import { Box, Container, Grid, Stack, Typography, Link } from '@mui/material'
import React from 'react'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
const Footer = ({ theme, lightTheme }) => {
  return (
    <Box bgcolor='primary.main' color='primary.contrastText' pt={4} pb={6}>
      <Container>
        <Grid container alignItems='center' justifyContent='center'>
          <Grid item xs={12} md={3}>
            <Stack direction='row' alignItems='center' justifyContent='center'>
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
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography fontSize='2.4rem' fontWeight={600} textAlign='center'>
              Copyright © 2021 Founders Language School
            </Typography>
            <Typography fontSize='1.4rem' textAlign='center'>
              Developed by{' '}
              <Link
                href='https://abdukahhar.uz'
                title='Shaxzodbek Qaxxorov'
                color='primary.contrastText'
                underline='hover'
                sx={{ cursor: 'pointer' }}
                target='_blank'
              >
                Shahzod Abdukahhar
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Footer
