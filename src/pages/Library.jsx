// Deps
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box, Container, Stack, Button } from '@mui/material'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
// Conf
import { db } from '../config/firebase'
import { lightTheme, darkTheme } from '../muiConfig'
// Comps
import Book from '../components/Book'
//Files
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

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
  const [curCategory, setCurCategory] = useState({ name: 'All' })
  const [curBooks, setCurBooks] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'library'), orderBy('name', 'asc'))
      )
      querySnapshot.forEach((doc) => {
        setBooks((books) => {
          const is = books.filter((b) => b.id === doc.id)
          if (!is.length) {
            return [...books, { id: doc.id, ...doc.data() }]
          } else {
            return books
          }
        })
      })
    }

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'categories'), orderBy('name', 'asc'))
      )
      querySnapshot.forEach((doc) => {
        setCategories((categories) => {
          const is = categories.filter((c) => c.id === doc.id)
          if (!is.length) {
            return [...categories, { id: doc.id, ...doc.data() }]
          } else {
            return categories
          }
        })
      })
      setCategories((c) => [{ name: 'All' }, ...c])
    }

    fetchBooks()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (curCategory.name === 'All') {
      setCurBooks(books)
    } else {
      setCurBooks(books.filter((book) => book.category.id === curCategory.id))
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
            {categories.length &&
              categories.map((category, i) => (
                <Button
                  key={i}
                  onClick={() => setCurCategory(category)}
                  sx={curCategory.name !== category.name ? disable : enable}
                >
                  {category.name}
                </Button>
              ))}
          </Container>
        </Box>
      </Box>
      <Box py={4}>
        <Container>
          <Stack>
            {curBooks.length &&
              curBooks.map((book) => (
                <Book key={book.id} book={book} device={device} />
              ))}
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}
export default Library
