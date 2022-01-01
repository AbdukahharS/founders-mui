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
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

const Intro = ({ intro, device }) => {
  const notCover = {
    width: device === 'xs' ? '25vw' : '15vw',
    top: 'unset',
    left: 'unset',
    right: '0',
    backgroundColor: 'transparent',
    height: 'unset',
  }
  const cover = {
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'fixed',
  }

  const [isPlay, setIsPlay] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [isCover, setIsCover] = useState(true)

  const expand = () => {
    setIsCover(true)
    const video = intro.current.querySelector('div video')
    if (video) {
      video.style.borderRadius = '0'
      video.style.width = device === 'xs' || device === 'sm' ? '90vw' : 'unset'
      video.style.height = device !== 'xs' && device !== 'sm' ? '90vh' : 'unset'
    }
  }

  const collapse = () => {
    setIsCover(false)
    const video = intro.current.querySelector('div video')
    if (video) {
      video.style.borderRadius = '50%'
      video.style.width = device === 'xs' ? '25vw' : '15vw'
      video.style.height = 'unset'
    }
  }

  const skip = () => {
    setIsPlay(true)
    setIsEnd(true)
    setIsCover(false)
  }
  const playVideo = () => {
    const box = intro.current
    setIsPlay(true)
    setIsCover(false)
    const video = box.querySelector('div video')
    if (box && video) {
      video.style.width = device === 'xs' ? '25vw' : '15vw'
      video.style.animation = ''
      video.play()
      video.addEventListener('ended', () => {
        setIsEnd(true)
        setIsCover(false)
      })
    }
  }
  window.addEventListener('load', () => {
    const box = intro.current
    const video = box.querySelector('div video')

    video.style.animation = 'attract 0.8s infinite'
    video.style.width = device === 'xs' ? '35vw' : '20vw'
  })
  return (
    <Stack
      ref={intro}
      sx={{
        position: 'absolute',
        zIndex: 1001,
        right: '0',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={isCover ? cover : notCover}
    >
      <Typography
        display={isPlay ? 'none' : ''}
        sx={{ color: '#fff', marginBottom: '1rem', fontSize: '2.4rem' }}
      >
        Check it out!
      </Typography>
      <Box position='relative'>
        <video
          width='100%'
          src={require('../videos/intro.mp4').default}
          style={{
            display: isEnd ? 'none' : '',
            borderRadius: '50%',
            width: device === 'xs' ? '25vw' : '15vw',
          }}
        ></video>
        <Button
          display={isPlay ? 'none' : ''}
          onClick={playVideo}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayArrowIcon
            sx={{
              color: '#fff',
              fontSize: isPlay ? '0rem' : '4rem',
            }}
          />
        </Button>
        <Button
          display={isPlay && !isCover && !isEnd ? '' : 'none'}
          onClick={expand}
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            transform: 'translate(-50%, 50%)',
          }}
        >
          <FullscreenIcon
            sx={{
              color: '#fff',
              fontSize: isPlay && !isCover && !isEnd ? '2rem' : '0',
            }}
          />
        </Button>
        <Button
          display={isPlay && isCover ? '' : 'none'}
          onClick={collapse}
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            transform: 'translate(-50%, 50%)',
            backgroundColor: isPlay && isCover ? 'rgba(0,0,0,0.3)' : '',
          }}
        >
          <FullscreenExitIcon
            sx={{
              color: '#fff',
              fontSize: isPlay && isCover ? '2rem' : '0',
            }}
          />
        </Button>
      </Box>
      <Button
        onClick={() => skip()}
        sx={{
          marginTop: '1rem',
          padding: '0',
        }}
        display={isPlay ? 'none' : ''}
      >
        <Typography color='#fff' fontSize='2rem' display={isPlay ? 'none' : ''}>
          Skip
        </Typography>
        <KeyboardDoubleArrowRightIcon
          sx={{ color: '#fff', fontSize: isPlay ? '0rem' : '2rem' }}
        />
      </Button>
    </Stack>
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

  const intro = useRef(null)
  return (
    <>
      <Box
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
