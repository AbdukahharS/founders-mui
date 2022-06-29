// React
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// MUI
import { Box, Container, Stack, Typography, Button } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'
import Recent from '../components/events/Recent'
import Upcoming from '../components/events/Upcoming'
const Events = ({ theme, setTheme, device }) => {
  const [path, setPath] = useState(localStorage.getItem('path') || 'recent')
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  useEffect(() => {
    localStorage.setItem('path', path)
  }, [path])
  return (
    <Stack
      direction='column'
      alignItems='stretch'
      minHeight='100vh'
      justifyContent='stretch'
      bgcolor='light.main'
    >
      <Box bgcolor='primary.main'>
        <Box color='primary.contrastText' py='0.6rem'>
          <Container>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack direction='row' alignItems='center' spacing={2}>
                <Link to='/'>
                  <img
                    src={theme === lightTheme ? logoDark : logo}
                    style={{ width: '4rem' }}
                    alt='Founders Logo'
                  />
                </Link>
                <Typography fontSize={device !== 'xs' ? '2rem' : '1.4rem'}>
                  Sunday Events
                </Typography>
              </Stack>
              <Button onClick={() => clickHandler()}>
                {theme === lightTheme ? (
                  <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
                ) : (
                  <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
                )}
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Stack direction='row' justifyContent='center'>
        <Button
          style={{ fontSize: '1.6rem', padding: '0.6rem 1.2rem' }}
          sx={
            path === 'recent'
              ? {
                  borderBottom: '1px solid',
                  borderColor: 'primary.contrastText',
                  cursor: 'default',
                  color: 'primary.contrastText',
                }
              : { color: 'primary.contrastText' }
          }
          onClick={() => {
            setPath('recent')
          }}
        >
          Recent
        </Button>
        <Button
          style={{ fontSize: '1.6rem', padding: '0.6rem 1.2rem' }}
          sx={
            path === 'upcoming'
              ? {
                  borderBottom: '1px solid',
                  borderColor: 'primary.contrastText',
                  cursor: 'default',
                  color: 'primary.contrastText',
                }
              : { color: 'primary.contrastText' }
          }
          onClick={() => {
            setPath('upcoming')
          }}
        >
          Upcoming
        </Button>
      </Stack>
      <Box>
        {path === 'recent' ? (
          <Recent device={device} />
        ) : (
          <Upcoming device={device} />
        )}
      </Box>
    </Stack>
  )
}
export default Events
