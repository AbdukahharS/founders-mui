// Dependencies
import React, { useState, useEffect } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { doc, getDoc } from 'firebase/firestore'
// Material-UI
import {
  Box,
  Container,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  List,
  CircularProgress,
  Button,
} from '@mui/material'
import { lightTheme, darkTheme } from '../muiConfig'
// Pages
import SundayEvents from '../components/admin/SundayEvents'
import RegsForEvents from '../components/admin/RegsForEvents'
import Offers from '../components/admin/Offers'
import Users from '../components/admin/Users'
import Library from '../components/admin/Library'
import Staff from '../components/admin/Staff/Staff'
// Icons
import EventSuggestions from '../components/admin/EventSuggestions'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
// Conf
import { db } from '../config/firebase'

const localStorage = window.localStorage

const Admin = ({ theme, setTheme }) => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [path, setPath] = useState(
    localStorage.getItem('adminpath')
      ? localStorage.getItem('adminpath')
      : 'sundayevents'
  )
  useEffect(() => {
    let themeColor = theme === darkTheme ? 'dark' : 'light'
    localStorage.setItem('theme', themeColor)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('adminpath', path)
  }, [path])

  useEffect(() => {
    const checkValid = () => {
      const docRef = doc(db, 'profiles', user.uid)
      getDoc(docRef).then((snap) => {
        const data = snap.data()
        if (data.admin) {
          navigate(`/admin/${localStorage.getItem('adminpath')}`)
          setIsValid(true)
        } else {
          navigate('/login')
          setIsValid(false)
        }
      })
    }
    if (!isValid && user) {
      checkValid()
    } else if (!user) {
      navigate('/login')
    }
  }, [isValid, navigate, user, path])

  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  return (
    <main>
      {isValid ? (
        <Box bgcolor='light.main' minHeight='100vh'>
          <Box py={1} sx={{ bgcolor: 'primary.main' }}>
            <Container>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Stack direction='row' alignItems='center' spacing={1}>
                  <img
                    src={require('../images/logo.png')}
                    alt='Logo'
                    style={{ width: '4rem' }}
                  />
                  <Typography fontSize='2rem' color='primary.contrastText'>
                    Admin Panel
                  </Typography>
                </Stack>
                <Button
                  onClick={() => clickHandler()}
                  sx={{
                    padding: '0.4rem',
                    minWidth: 'unset',
                  }}
                >
                  {theme === lightTheme ? (
                    <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
                  ) : (
                    <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
                  )}
                </Button>
              </Stack>
            </Container>
          </Box>
          <Stack
            width='100%'
            direction='row'
            alignItems='flex-start'
            p={2}
            spacing={2}
          >
            <List
              sx={{
                bgcolor: 'primary.main',
                width: '20%',
                color: 'primary.contrastText',
              }}
            >
              <ListItem
                sx={
                  path === 'sundayevents'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('sundayevents')
                  navigate('/admin/sundayevents')
                }}
              >
                <ListItemText primary='Sunday Events' />
              </ListItem>
              <Divider />
              <ListItem
                sx={
                  path === 'offers'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                divider
                onClick={() => {
                  setPath('offers')
                  navigate('/admin/offers')
                }}
              >
                <ListItemText primary='Suggestions&Objections' />
              </ListItem>
              <ListItem
                sx={
                  path === 'eventsuggestions'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('eventsuggestions')
                  navigate('/admin/eventsuggestions')
                }}
              >
                <ListItemText primary='Offers for Sunday events' />
              </ListItem>
              <Divider light />
              <ListItem
                sx={
                  path === 'regsforevents'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('regsforevents')
                  navigate('/admin/regsforevents')
                }}
              >
                <ListItemText primary='Registrations for Sunday events' />
              </ListItem>
              <Divider light />
              <ListItem
                sx={
                  path === 'users'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('users')
                  navigate('/admin/users')
                }}
              >
                <ListItemText primary='Users' />
              </ListItem>
              <Divider light />
              <ListItem
                sx={
                  path === 'library'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('library')
                  navigate('/admin/library')
                }}
              >
                <ListItemText primary='Library' />
              </ListItem>
              <Divider light />
              <ListItem
                sx={
                  path === 'staff'
                    ? {
                        bgcolor: 'secondary.light',
                        color: 'secondary.contrastText',
                      }
                    : { bgcolor: 'primary.main' }
                }
                button
                onClick={() => {
                  setPath('staff')
                  navigate('/admin/staff')
                }}
              >
                <ListItemText primary='Staff' />
              </ListItem>
            </List>

            <Box width='100%'>
              <Routes>
                <Route path='sundayevents' element={<SundayEvents />} />
                <Route path='regsforevents' element={<RegsForEvents />} />
                <Route path='offers' element={<Offers />} />
                <Route path='eventsuggestions' element={<EventSuggestions />} />
                <Route path='users' element={<Users />} />
                <Route path='library' element={<Library />} />
                <Route path='staff' element={<Staff />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Stack alignItems='center' justifyContent='center' height='100vh'>
          <CircularProgress size='6rem' />
        </Stack>
      )}
    </main>
  )
}
export default Admin
