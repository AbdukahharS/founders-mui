import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box, Container, Stack, Button } from '@mui/material'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import DownloadIcon from '@mui/icons-material/Download'
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
  const [books, setBooks] = useState([])
  const [curCategory, setCurCategory] = useState('All')
  const [curBooks, setCurBooks] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('https://founders.uz/backend/books', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const data = await res.json()
      setBooks(await data.body)
    }
    const fetchCategories = async () => {
      const res = await fetch('https://founders.uz/backend/categories', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const data = await res.json()
      data.body.unshift('All')
      setCategories(await data.body)
    }
    fetchBooks()
    fetchCategories()
  }, [])
  useEffect(() => {
    if (curCategory === 'All') {
      setCurBooks(books)
    } else {
      setCurBooks(books.filter((book) => book.category === curCategory))
    }
  }, [curCategory, books])
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
        <Box color='primary.contrastText' className='categories'>
          <Container>
            {categories.map((category, i) => (
              <Button
                key={i}
                onClick={() => setCurCategory(category)}
                sx={curCategory !== category ? disable : enable}
              >
                {category}
              </Button>
            ))}
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
                    src={book.banner}
                    alt='blah'
                  />
                  <Stack>
                    <Typography fontSize='1.4rem' color='secondary'>
                      {book.name}
                    </Typography>
                    {book.audio && (
                      <a href={book.audio} download>
                        <Typography
                          fontSize='1.2rem'
                          color='secondary'
                          sx={{ textDecoration: 'underline' }}
                        >
                          Download Audio
                        </Typography>
                      </a>
                    )}
                  </Stack>
                </Stack>
                <a href={book.file} download>
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
