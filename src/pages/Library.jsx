import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box, Container, Stack, Button } from '@mui/material'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import DownloadIcon from '@mui/icons-material/Download'
// DB Books
import books from '../db/books'

const disable = {
  color: 'primary.contrastText',
}

const enable = {
  color: 'secondary.main',
  borderBottomWidth: '4px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'secondary.main',
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
}

const Library = ({ theme, setTheme, device }) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  const [curCategory, setCurCategory] = useState('all')
  const [curBooks, setCurBooks] = useState([])
  useEffect(() => {
    if (curCategory === 'all') {
      setCurBooks(books)
    } else {
      setCurBooks(books.filter((book) => book.category === curCategory))
    }
  }, [curCategory])
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
                <Typography variant='h2'>Library</Typography>
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
        <Box
          // bgcolor='primary.main'
          color='primary.contrastText'
          className='categories'
        >
          <Container>
            <Button
              onClick={() => setCurCategory('all')}
              sx={curCategory !== 'all' ? disable : enable}
            >
              All
            </Button>
            <Button
              onClick={() => setCurCategory('writing')}
              sx={curCategory !== 'writing' ? disable : enable}
            >
              Writing
            </Button>
            <Button
              onClick={() => setCurCategory('reading')}
              sx={curCategory !== 'reading' ? disable : enable}
            >
              Reading
            </Button>
          </Container>
        </Box>
      </Box>
      <Box py={4}>
        <Container>
          <Stack>
            {curBooks.map((book, i) => (
              <Stack
                key={i}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                py={1}
                px={device === 'xs' || device === 'sm' ? 0 : 4}
                spacing={device === 'xs' || device === 'sm' ? 1 : 4}
              >
                <Stack direction='row' alignItems='center' spacing={2}>
                  <img
                    style={{ height: '8rem' }}
                    src={require(`../images/${book.banner}`).default}
                    alt='blah'
                  />
                  <Stack>
                    <Typography fontSize='1.4rem' color='secondary'>
                      {book.name}
                    </Typography>
                    {device !== 'xs' && (
                      <Typography color='primary.contrastText'>
                        {book.description}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <a href={require(`../books/${book.file}`).default} download>
                  <DownloadIcon sx={{ color: 'secondary.main' }} />
                </a>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}

export default Library
