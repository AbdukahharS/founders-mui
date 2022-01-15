import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Link } from 'react-router-dom'
import SundayEvents from '../components/admin/SundayEvents'

const localStorage = window.localStorage

const Admin = ({ token }) => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState('sundayEvents')

  const checkToken = async () => {
    try {
      const res = await fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/welcome',
        {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      ).catch((err) => {
        console.log(err)
      })
      const data = await res.json()
      if (data.message !== 'valid') {
        localStorage.removeItem('token')
        navigate('/admin/login')
      }
    } catch (err) {
      console.error(err)
    }
  }

  checkToken()

  return (
    <main>
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
      {token ? (
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
            <SundayEvents screen={screen} />
          </Box>
        </Stack>
      ) : (
        <Typography>
          You should <Link to='/admin/login'>log in</Link>
        </Typography>
      )}
    </main>
  )
}

export default Admin
