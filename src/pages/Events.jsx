import { Box, Container, Stack, Typography, Button } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'

const Events = ({ theme, setTheme }) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  return (
    <Stack
      direction='column'
      alignItems='stretch'
      minHeight='100vh'
      justifyContent='stretch'
      bgcolor='info.light'
    >
      <Box
        sx={
          theme.palette.mode === 'dark'
            ? { backgroundColor: 'primary.main' }
            : { backgroundImage: theme.palette.background }
        }
      >
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
                <Typography variant='h2'>Sunday Events</Typography>
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
    </Stack>
  )
}

export default Events
