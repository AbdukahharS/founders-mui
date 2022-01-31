import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// MUI
import { darkTheme } from '../../muiConfig'
import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

const Modal = ({ openQA, theme }) => {
  const [type, setType] = useState('suggestion')
  const [body, setBody] = useState('')
  const [phone, setPhone] = useState(1111111)
  const [succes, setSucces] = useState(false)

  const handleClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, body, phone: `+998 ${phone}` }),
    }
    const data = await fetch(
      'https://founders-backend.shakhzodbekkakh.repl.co/api/offers',
      requestOptions
    )
    if (data.status === 200) {
      setSucces(true)
    }
  }
  return (
    <>
      <Snackbar
        open={succes}
        autoHideDuration={6000}
        onClose={() => setSucces(false)}
      >
        <Alert
          onClose={() => setSucces(false)}
          severity='success'
          sx={{
            width: '100%',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
          }}
        >
          Your {type} is sent!
        </Alert>
      </Snackbar>
      <Collapse in={openQA}>
        <Stack
          direction='column'
          minWidth='26rem'
          sx={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
        >
          <Box
            sx={{ backgroundColor: 'primary.main', py: '1rem' }}
            style={
              theme.palette.mode === 'dark'
                ? { backgroundColor: theme.palette.background }
                : { backgroundImage: theme.palette.background }
            }
          >
            <Typography
              fontSize='2rem'
              textAlign='center'
              color='primary.contrastText'
            >
              Hi, how can we help?
            </Typography>
          </Box>
          <Stack
            sx={{ backgroundColor: 'light.main', position: 'relative' }}
            minHeight='70vh'
            direction='column'
          >
            <Typography
              fontSize='1.6rem'
              px={2}
              py={1}
              color='light.contrastText'
            >
              Do you have ... ?
            </Typography>
            <Stack
              sx={{
                py: 2,
                px: 3,
              }}
            >
              <FormControl
                fullWidth
                color='secondary'
                sx={{ backgroundColor: 'light.main' }}
              >
                <InputLabel id='demo-simple-select-label'>You have</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={type}
                  label='Information type'
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  sx={{ backgroundColor: 'light.main' }}
                >
                  <MenuItem value={'suggestion'}>Suggestion</MenuItem>
                  <MenuItem value={'objection'}>Objection</MenuItem>
                  <MenuItem value={'question'}>Question</MenuItem>
                </Select>
              </FormControl>
              <TextField
                color='secondary'
                id='outlined-basic'
                label={`Write your ${type}`}
                variant='outlined'
                sx={{ mt: 1.6 }}
                multiline
                onChange={(e) => {
                  setBody(e.target.value)
                }}
              />
              <TextField
                variant='outlined'
                label='Your phone number'
                value={phone}
                sx={{ mt: 1.6 }}
                onChange={(e) => setPhone(Number(e.target.value))}
                type='number'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>+998</InputAdornment>
                  ),
                }}
                color='secondary'
              />
              <Button
                sx={{
                  backgroundColor: 'secondary.main',
                  width: 'fit-content',
                  mx: 'auto',
                  mt: 1,
                }}
                onClick={handleClick}
              >
                Submit
              </Button>
            </Stack>
            <Button
              sx={{ justifyContent: 'flex-start', color: 'secondary.main' }}
            >
              <Link
                to='/faqs'
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                }}
              >
                FAQs
              </Link>
            </Button>
            <Button
              sx={{ justifyContent: 'flex-start', color: 'secondary.main' }}
            >
              <a
                href='https://t.me/founders_admin'
                target='_blank'
                rel='noreferrer'
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                }}
              >
                Direct to Administration
              </a>
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </>
  )
}

const Help = ({ theme, openQA, setOpenQA, language }) => {
  return (
    <>
      <Stack
        direction='column'
        position='relative'
        sx={{
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          alignItems: 'flex-end',
          zIndex: 1001,
        }}
        spacing={2}
      >
        <Modal openQA={openQA} theme={theme} />
        <Stack
          sx={{
            height: '3rem',
            py: 0.4,
            px: 1.4,
            borderRadius: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: '1001',
            flexDirection: 'row',
            width: 'fit-content',
          }}
          backgroundColor={openQA ? 'transparent' : 'primary.main'}
          onClick={() => {
            setOpenQA(!openQA)
          }}
        >
          <Collapse in={openQA} orientation='horizontal'>
            <CancelIcon sx={{ color: 'secondary.main', fontSize: '2.6rem' }} />
          </Collapse>
          <Collapse in={!openQA} orientation='horizontal'>
            <Stack sx={{ alignItems: 'center' }} direction='row'>
              <img
                style={{ width: '2rem', marginRight: '0.6rem' }}
                src={
                  theme === darkTheme
                    ? require('../../images/help-light.png').default
                    : require('../../images/help-dark.png').default
                }
                alt='Help Icon'
              />
              <Typography color='secondary'>{language.help}!</Typography>
            </Stack>
          </Collapse>
        </Stack>
      </Stack>
    </>
  )
}

export default Help
