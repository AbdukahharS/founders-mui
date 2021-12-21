import React from 'react'
import { Box, Container, Grid, Stack, Typography, Link } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'

const Contacts = () => {
  return (
    <Box
      id='contacts'
      bgcolor='info.light'
      color='info.contrastText'
      pt={2}
      pb={10}
    >
      <Container>
        <Typography
          variant='h2'
          mb={6}
          color='secondary'
          fontWeight={700}
          className='topic'
        >
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.2289769212975!2d69.235748!3d41.3038821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba966c0cdbf%3A0xe69be7522d8208da!2sMilliy%20Bog!5e0!3m2!1sen!2s!4v1637792209114!5m2!1sen!2s'
              width='100%'
              height='400px'
              style={{ border: '0' }}
              allowFullScreen=''
              loading='lazy'
              title='Google Maps'
            ></iframe>
          </Grid>
          <Grid item xs={12} lg={4} fontFamily='Josefin Slab'>
            <Link
              href='/'
              underline='hover'
              color='secondary'
              sx={{ display: 'flex', alignItems: 'center' }}
              mb={1}
              target='_blank'
            >
              <LocationOnIcon
                color='secondary'
                sx={{
                  fontSize: '3rem',
                  display: 'inline',
                  marginRight: '0.4rem',
                }}
              />
              <Typography
                color='secondary'
                fontSize='1.3rem'
                fontFamily='Josefin Slab'
              >
                Milliy Bog Station, opposite of Legislative Chamber
              </Typography>
            </Link>
            <Stack direction='row' spacing={0.4} mb={1}>
              <LocalPhoneIcon color='secondary' sx={{ fontSize: '3rem' }} />
              <Stack direction='column'>
                <Link
                  underline='hover'
                  fontSize='1.4rem'
                  color='secondary'
                  href='tel:+998712055333'
                  target='_blank'
                >
                  +998 71 205 53 33
                </Link>
                <Link
                  underline='hover'
                  color='secondary'
                  fontSize='1.4rem'
                  href='tel:+998712050333'
                  target='_blank'
                >
                  +998 71 205 03 33
                </Link>
              </Stack>
            </Stack>
            <Link
              underline='hover'
              color='secondary'
              sx={{ display: 'flex', alignItems: 'center' }}
              href='https://t.me/founders_school_uz'
              fontSize='1.4rem'
              mb={1}
              target='_blank'
            >
              <TelegramIcon
                color='secondary'
                sx={{ fontSize: '3rem', marginRight: '0.4rem' }}
              />
              t.me/founders_school_uz
            </Link>
            <Link
              underline='hover'
              color='secondary'
              sx={{ display: 'flex', alignItems: 'center' }}
              href='https://instagram.com/founders.school.uz'
              fontSize='1.4rem'
              mb={1}
              target='_blank'
            >
              <InstagramIcon
                color='secondary'
                sx={{ fontSize: '3rem', marginRight: '0.4rem' }}
              />
              instagram.com/founders.school.uz
            </Link>
            <Link
              underline='hover'
              color='secondary'
              sx={{ display: 'flex', alignItems: 'center' }}
              href='https://www.facebook.com/Foundersschooluz-109181231588117'
              fontSize='1.4rem'
              mb={1}
              target='_blank'
            >
              <FacebookIcon
                color='secondary'
                sx={{ fontSize: '3rem', marginRight: '0.4rem' }}
              />
              Foundersschooluz
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contacts
