import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Slide,
  // Link,
} from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import BookIcon from '@mui/icons-material/Book'
import GroupIcon from '@mui/icons-material/Group'
import SchoolIcon from '@mui/icons-material/School'
import Slider from './Slider'

const items = [
  {
    icon: BookIcon,
    desc: 'Donec accumsan arcu magna, nec lobortis leo lobortis vel. Vivamus quis scelerisque libero.',
  },
  {
    icon: GroupIcon,
    desc: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  },
  {
    icon: SchoolIcon,
    desc: 'Curabitur ut orci ut dolor condimentum finibus vel sed purus.',
  },
]

const Features = ({ isMobile, theme }) => {
  const containerRef = useRef()
  const [scrolled, setScrolled] = useState(false)
  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      const cont = containerRef.current
      if (cont && cont.getBoundingClientRect().y <= 0.67 * window.innerHeight) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  })
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
          Features
        </Typography>
        {!isMobile ? (
          <Grid container pt={4} px={2} spacing={4} ref={containerRef}>
            <Grid item xs={12} sm={6} lg={4}>
              <Slide direction='up' in={scrolled}>
                <Stack alignItems='center' justifyContent='center'>
                  <BookIcon sx={{ fontSize: '8rem' }} />
                  <Typography fontSize='1.4rem' textAlign='center'>
                    We have our own library for everyone!
                  </Typography>
                  <Link
                    to='/library'
                    style={{
                      textDecoration: 'underline',
                      fontSize: '1.4rem',
                      color: 'secondary.main',
                    }}
                  >
                    Go to the library
                  </Link>
                </Stack>
              </Slide>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Slide direction='up' in={scrolled}>
                <Stack alignItems='center' justifyContent='center'>
                  <GroupIcon sx={{ fontSize: '8rem' }} />
                  <Typography fontSize='1.4rem' textAlign='center'>
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia curae.
                  </Typography>
                </Stack>
              </Slide>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Slide direction='up' in={scrolled}>
                <Stack alignItems='center' justifyContent='center'>
                  <SchoolIcon sx={{ fontSize: '8rem' }} />
                  <Typography fontSize='1.4rem' textAlign='center'>
                    Curabitur ut orci ut dolor condimentum finibus vel sed
                    purus.
                  </Typography>
                </Stack>
              </Slide>
            </Grid>
          </Grid>
        ) : (
          <Stack>
            <Slider items={items} />
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default Features
