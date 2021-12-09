import {
  Slide,
  Box,
  Button,
  Link,
  Stack,
  Typography,
  Divider,
} from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

const style = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  bgcolor: 'info.light',
  color: 'primary.contrastText',
  p: 4,
}

const MenuModal = ({
  openMenu,
  setOpenMenu,
  theme,
  setTheme,
  lightTheme,
  darkTheme,
}) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  return (
    <Slide direction='down' in={openMenu}>
      <Box sx={style}>
        <Stack direction='column'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Button onClick={() => clickHandler()}>
              {theme === lightTheme ? (
                <Brightness7Icon
                  fontSize='large'
                  sx={{ color: 'primary.contrastText' }}
                />
              ) : (
                <Brightness4Icon
                  fontSize='large'
                  sx={{ color: 'primary.contrastText' }}
                />
              )}
            </Button>
            <Button onClick={() => setOpenMenu(false)}>
              <CancelIcon fontSize='large' color='secondary' />
            </Button>
          </Stack>
          <Divider
            sx={{ backgroundColor: 'secondary.main', marginY: '1rem' }}
          />
          <Stack onClick={() => setOpenMenu(false)} spacing={0.6}>
            <Link
              href='#courses'
              style={{ fontSize: '1.4rem' }}
              color='inherit'
              underline='hover'
            >
              Courses
            </Link>
            <Link
              href='#instructors'
              style={{ fontSize: '1.4rem' }}
              color='inherit'
              underline='hover'
            >
              Instructors
            </Link>
            <Link
              href='#contacts'
              style={{ fontSize: '1.4rem' }}
              color='inherit'
              underline='hover'
            >
              Contact us
            </Link>
          </Stack>
          <Divider
            sx={{ backgroundColor: 'secondary.main', marginY: '1rem' }}
          />
          <Stack>
            <Link
              href='tel:+998712055333'
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
              }}
            >
              <Stack
                alignItems='center'
                justifyContent='center'
                borderRadius='50%'
                bgcolor='secondary.main'
                p={1}
                mr={1}
              >
                <LocalPhoneIcon color='primary' />
              </Stack>
              <Typography component='span' fontSize='1.2rem'>
                +998 71 205 53 33
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Slide>
  )
}

export default MenuModal
