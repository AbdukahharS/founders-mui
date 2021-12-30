import React, { useRef, useState } from 'react'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Link,
  Grow,
} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Intro = ({ intro, device }) => {
  return (
    <Box
      ref={intro}
      sx={{
        position: 'fixed',
        zIndex: 1001,
        width: device === 'xs' ? '40vw' : '30vw',
        right: '0',
      }}
    >
      <video
        autoPlay={'autoplay'}
        controls
        loop
        width='100%'
        src={require('../videos/intro.mp4').default}
        muted
      ></video>
    </Box>
  )
}

const Navbar = ({
  setOpenMenu,
  theme,
  setTheme,
  lightTheme,
  darkTheme,
  device,
  language,
  changeLang,
}) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  const toggleMenu = () => {
    setOpenMenu(true)
  }
  const [openLan, setOpenLan] = useState(false)
  const handleChange = async (lang) => {
    changeLang(lang)
    setOpenLan(false)
  }

  const nav = useRef(null)
  const intro = useRef(null)
  const [sticky, setSticky] = useState(nav.current && nav.current.clientHeight)

  window.addEventListener('scroll', () => {
    setSticky(nav.current && nav.current.clientHeight)
    if (window.pageYOffset >= sticky && sticky > 0) {
      if (intro.current) {
        intro.current.style.top = '0'
      }
    } else if (intro.current && sticky > 0) {
      intro.current.style.top = `${sticky - window.pageYOffset}px`
    }
  })

  return (
    <>
      <Box
        ref={nav}
        sx={
          theme.palette.mode === 'dark'
            ? { backgroundColor: theme.palette.background }
            : { backgroundImage: theme.palette.background }
        }
        color='primary.contrastText'
        py={device === 'xs' ? '0.2rem' : '0.6rem'}
        zIndex={1}
        width='100%'
      >
        <Container>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={device === 'lg' ? 2.6 : device === 'xl' ? 3.2 : 0.8}
              fontWeight={language.lang === 'ru' ? 300 : 500}
            >
              <Stack direction='row' alignItems='center'>
                <img
                  src={theme === lightTheme ? logoDark : logo}
                  style={{
                    width:
                      device === 'lg'
                        ? '4.4rem'
                        : device === 'xl'
                        ? '5rem'
                        : '3.4rem',
                  }}
                  alt='Founders Logo'
                />
                {(device === 'xl' || device === 'lg') && (
                  <Stack>
                    <Typography
                      sx={{
                        fontWeight: '500',
                        lineHeight: 'normal',
                        fontSize: '1.1rem',
                        fontFamily: 'Roboto',
                      }}
                    >
                      FOUNDERS
                    </Typography>
                    <Typography
                      fontSize='0.9rem'
                      lineHeight='normal'
                      fontFamily='Roboto'
                    >
                      LANGUAGE
                    </Typography>
                    <Typography
                      fontSize='0.9rem'
                      lineHeight='normal'
                      fontFamily='Roboto'
                    >
                      SCHOOL
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {device !== 'xs' && device !== 'sm' && (
                <>
                  <Link
                    href='#courses'
                    style={
                      language.lang === 'ru'
                        ? { fontSize: '1.2rem' }
                        : { fontSize: '1.4rem' }
                    }
                    color='inherit'
                    underline='hover'
                  >
                    {language.navbar.courses}
                  </Link>
                  <Link
                    href='#features'
                    style={
                      language.lang === 'ru'
                        ? { fontSize: '1.2rem' }
                        : { fontSize: '1.4rem' }
                    }
                    color='inherit'
                    underline='hover'
                  >
                    {language.navbar.features}
                  </Link>
                  <Link
                    href='#instructors'
                    style={
                      language.lang === 'ru'
                        ? { fontSize: '1.2rem' }
                        : { fontSize: '1.4rem' }
                    }
                    color='inherit'
                    underline='hover'
                  >
                    {language.navbar.instructors}
                  </Link>
                  <Link
                    href='#contacts'
                    style={
                      language.lang === 'ru'
                        ? { fontSize: '1.2rem' }
                        : { fontSize: '1.4rem' }
                    }
                    color='inherit'
                    underline='hover'
                  >
                    {language.navbar.contact}
                  </Link>
                </>
              )}
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={device === 'md' ? 0.3 : 1}
            >
              {(device === 'xs' || device === 'sm') && (
                <>
                  <Button
                    sx={{
                      border: '1px solid',
                      borderColor: 'primary.contrastText',
                      px: 0,
                    }}
                    onClick={() => toggleMenu()}
                  >
                    <MenuIcon
                      fontSize='large'
                      sx={{ color: 'primary.contrastText' }}
                    />
                  </Button>
                </>
              )}
              {device !== 'xs' && device !== 'sm' && (
                <>
                  <Link
                    href='tel:+998712055333'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      fontSize: '1.2rem',
                    }}
                  >
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      borderRadius='50%'
                      bgcolor='secondary.main'
                      p={device === 'md' ? 0.4 : 1}
                      mr={1}
                    >
                      <LocalPhoneIcon color='primary' />
                    </Stack>
                    +998 71 205 53 33
                  </Link>
                  <Button
                    onClick={() => clickHandler()}
                    sx={{
                      padding: device === 'md' ? '0.1rem' : '0.4rem',
                      minWidth: 'unset',
                    }}
                  >
                    {theme === lightTheme ? (
                      <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
                    ) : (
                      <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
                    )}
                  </Button>
                  <Box>
                    <Button
                      onClick={() => setOpenLan(true)}
                      sx={{
                        padding: device === 'md' ? '0.1rem' : '0.4rem',
                        minWidth: 'unset',
                      }}
                    >
                      <img
                        src={
                          language.navbar.button &&
                          require(`../images/${language.navbar.button.img}`)
                            .default
                        }
                        alt='Country Flag'
                        style={{ width: '2.2rem' }}
                      />
                      {device !== 'md' && (
                        <KeyboardArrowDownIcon
                          sx={{ color: 'secondary.main' }}
                        />
                      )}
                    </Button>
                    <Grow in={openLan}>
                      <Stack
                        position='absolute'
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '1rem',
                        }}
                      >
                        {language.navbar.button &&
                          language.navbar.button.otherBtns.map((btn, i) => (
                            <Box
                              onClick={() => handleChange(btn.lang)}
                              key={i}
                              sx={{
                                cursor: 'pointer',
                                py: 1,
                                px: 2,
                                zIndex: 1002,
                              }}
                            >
                              <img
                                src={require(`../images/${btn.img}`).default}
                                alt='Country Flag'
                                style={{ width: '2rem' }}
                              />
                            </Box>
                          ))}
                      </Stack>
                    </Grow>
                  </Box>
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Intro intro={intro} device={device} />
    </>
  )
}

export default Navbar
