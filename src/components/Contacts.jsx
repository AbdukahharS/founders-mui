import React from 'react'
import { Box, Container, Grid, Stack, Typography, Link } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'

const Contacts = ({ language }) => {
  return (
    <Box
      id='contacts'
      bgcolor='light.main'
      color='light.contrastText'
      pt={2}
      pb={10}
    >
      <Container>
        <Typography
          fontSize='3rem'
          mb={6}
          color='secondary'
          fontWeight={700}
          className='topic'
        >
          {language.contact.heading}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5994.225843719499!2d69.236315!3d41.306407!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x580ecc545cc25d07!2zNDHCsDE4JzIzLjEiTiA2OcKwMTQnMTAuNyJF!5e0!3m2!1sen!2s!4v1640899816452!5m2!1sen!2s'
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
              <Stack
                bgcolor='secondary.main'
                borderRadius='50%'
                alignItems='center'
                justifyContent='center'
                p={0.6}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: '2.4rem',
                    color: 'secondary.contrastText',
                  }}
                />
              </Stack>
              <Typography
                color='secondary'
                fontSize='1.3rem'
                fontFamily='Josefin Slab'
                ml={1}
              >
                {language.contact.address}
              </Typography>
            </Link>
            <Stack direction='row' spacing={0.4} mb={1}>
              <Stack
                bgcolor='secondary.main'
                borderRadius='50%'
                alignItems='center'
                justifyContent='center'
                p={0.6}
              >
                <LocalPhoneIcon
                  sx={{
                    fontSize: '2.4rem',
                    color: 'secondary.contrastText',
                  }}
                />
              </Stack>
              <Stack direction='column' ml={1}>
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
              <Stack
                bgcolor='secondary.main'
                borderRadius='50%'
                alignItems='center'
                justifyContent='center'
                p={0.6}
                mr={1}
              >
                <TelegramIcon
                  sx={{
                    fontSize: '2.4rem',
                    color: 'secondary.contrastText',
                  }}
                />
              </Stack>
              T.me/founders_school_uz
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
              <Stack
                bgcolor='secondary.main'
                borderRadius='50%'
                alignItems='center'
                justifyContent='center'
                p={0.6}
                mr={1}
              >
                <InstagramIcon
                  sx={{
                    fontSize: '2.4rem',
                    color: 'secondary.contrastText',
                  }}
                />
              </Stack>
              Instagram.com/founders.school.uz
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
              <Stack
                bgcolor='secondary.main'
                borderRadius='50%'
                alignItems='center'
                justifyContent='center'
                p={0.6}
                mr={1}
              >
                <FacebookIcon
                  sx={{
                    fontSize: '2.4rem',
                    color: 'secondary.contrastText',
                  }}
                />
              </Stack>
              Foundersschooluz
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contacts
