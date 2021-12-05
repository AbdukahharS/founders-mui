import React from 'react'
import logo from './../images/logo.png'
// import '../css/navbar.css'
import { Container, Box, Stack, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bgcolor='primary.dark' color='primary.contrastText' py='1rem'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center' spacing={5}>
            <Stack direction='row' alignItems='center'>
              <img src={logo} width='65' alt='Founders Logo' />
              <div className='right'>
                <Typography
                  sx={{
                    fontWeight: '500',
                    lineHeight: 'normal',
                    fontSize: '1.1rem',
                  }}
                >
                  FOUNDERS
                </Typography>
                <Typography fontSize='0.9rem' lineHeight='normal'>
                  LANGUAGE
                </Typography>
                <Typography fontSize='0.9rem' lineHeight='normal'>
                  SCHOOL
                </Typography>
              </div>
            </Stack>
            <Link to='#courses' style={{ fontSize: '1.4rem' }}>
              Courses
            </Link>
            <Link to='#courses' style={{ fontSize: '1.4rem' }}>
              Instructors
            </Link>
            <Link to='#contacts' style={{ fontSize: '1.4rem' }}>
              Contact us
            </Link>
          </Stack>
          <Link
            to='tel:+998712055333'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Stack
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              bgcolor='rgba(0,0,0,0.6)'
              p={1}
              mr={1}
            >
              <LocalPhoneIcon />
            </Stack>
            <Typography component='span' fontSize='1.2rem'>
              +998 71 205 53 33
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar
