import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import SundayEvents from '../components/admin/SundayEvents'

const localStorage = window.localStorage

const Admin = ({ token, setToken }) => {
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/welcome', {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.message !== 'valid') {
          setToken(null)
          navigate('/login')
        } else {
          setIsValid(true)
          navigate('/admin/sundayevents')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [navigate, setToken])

  return (
    <main>
      {isValid && (
        <>
          <Box py={1}>
            <Container>
              <Stack direction='row' alignItems='center' spacing={1}>
                <img
                  src={require('../images/logo-dark.png').default}
                  alt='Logo'
                  style={{ width: '4rem' }}
                />
                <Typography fontSize='2rem'>Admin Panel</Typography>
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
              width='30%'
              sx={{ bgcolor: 'primary.main' }}
              component='nav'
              aria-label='mailbox folders'
            >
              <ListItem button>
                <ListItemText primary='Sunday Events' />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary='Suggestions&Objections' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='Offers for Sunday events' />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary='Registrations for Sunday events' />
              </ListItem>
            </List>
            <Box width='70%'>
              <Routes>
                <Route path='sundayevents' element={<SundayEvents />} />
              </Routes>
            </Box>
          </Stack>
        </>
      )}
    </main>
  )
}

export default Admin
