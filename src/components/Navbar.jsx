import React from 'react'
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

const Navbar = ({
  setOpenMenu,
  theme,
  setTheme,
  lightTheme,
  darkTheme,
  isMobile,
  isTablet,
  language,
  changeLang,
}) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  const toggleMenu = () => {
    setOpenMenu(true)
  }
  const [openLan, setOpenLan] = React.useState(false)
  const handleChange = async (lang) => {
    changeLang(lang)
    setOpenLan(false)
  }

  return (
    <Box
      sx={
        theme.palette.mode === 'dark'
          ? { backgroundColor: theme.palette.background }
          : { backgroundImage: theme.palette.background }
      }
      color='primary.contrastText'
      py={isMobile ? '0.2rem' : '0.6rem'}
      position={!isMobile && !isTablet ? 'absolute' : 'unset'}
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
            spacing={1.6}
            fontWeight={language.lang === 'ru' ? 300 : 500}
          >
            <Stack direction='row' alignItems='center'>
              <img
                src={theme === lightTheme ? logoDark : logo}
                style={{ width: '4rem' }}
                alt='Founders Logo'
              />
              {!isMobile && (
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
            {!isMobile && !isTablet && (
              <>
                <Link
                  href='#courses'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  {language.navbar.courses}
                </Link>
                <Link
                  href='#features'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  {language.navbar.features}
                </Link>
                <Link
                  href='#instructors'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  {language.navbar.instructors}
                </Link>
                <Link
                  href='#contacts'
                  style={{ fontSize: '1.4rem' }}
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
            // spacing={1}
          >
            {(isMobile || isTablet) && (
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
            {!isMobile && !isTablet && (
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
                    p={1}
                    mr={1}
                  >
                    <LocalPhoneIcon color='primary' />
                  </Stack>
                  +998 71 205 53 33
                </Link>
                <Button onClick={() => clickHandler()}>
                  {theme === lightTheme ? (
                    <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
                  ) : (
                    <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
                  )}
                </Button>
                <Box>
                  <Button onClick={() => setOpenLan(true)}>
                    <img
                      src={
                        language.navbar.button &&
                        require(`../images/${language.navbar.button.img}`)
                          .default
                      }
                      alt='Country Flag'
                      style={{ width: '2.2rem' }}
                    />
                    <KeyboardArrowDownIcon sx={{ color: 'secondary.main' }} />
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
                            sx={{ cursor: 'pointer', py: 1, px: 2 }}
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
  )
}

export default Navbar
