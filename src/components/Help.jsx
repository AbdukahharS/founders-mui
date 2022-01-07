import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// MUI
import { darkTheme } from '../muiConfig'
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
} from '@mui/material'
// Icons
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Modal = ({ openQA, theme }) => {
  const [openForm, setOpenForm] = useState(false)
  const [type, setType] = useState('suggestion')
  const [body, setBody] = useState('')
  const [succes, setSucces] = useState(false)

  const handleClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, body }),
    }
    const data = await fetch(
      'https://founders-backend.shakhzodbekkakh.repl.co/offers',
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
          <Stack sx={{ backgroundColor: 'info.light' }} direction='column'>
            <Button
              onClick={() => setOpenForm(!openForm)}
              sx={{ justifyContent: 'flex-start' }}
            >
              {openForm ? (
                <RemoveIcon sx={{ color: 'secondary.main' }} />
              ) : (
                <AddIcon sx={{ color: 'secondary.main' }} />
              )}
              <Typography color='info.contrastText'>
                Do you have Suggestion or Objection?
              </Typography>
            </Button>
            <Collapse in={openForm}>
              <Stack
                sx={{
                  py: 2,
                  px: 3,
                }}
              >
                <FormControl
                  fullWidth
                  color='secondary'
                  sx={{ backgroundColor: 'info.light' }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    You have
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={type}
                    label='Information type'
                    onChange={(e) => {
                      setType(e.target.value)
                    }}
                    sx={{ backgroundColor: 'info.light' }}
                  >
                    <MenuItem className='blah' value={'suggestion'}>
                      Suggestion
                    </MenuItem>
                    <MenuItem className='blah' value={'objection'}>
                      Objection
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  color='secondary'
                  id='outlined-basic'
                  label={`Write your ${type}`}
                  variant='outlined'
                  sx={{ mt: 1 }}
                  multiline
                  onChange={(e) => {
                    setBody(e.target.value)
                  }}
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
            </Collapse>
            <Button
              href='https://t.me'
              target='_blank'
              sx={{ justifyContent: 'flex-start', color: 'secondary.main' }}
            >
              Contact with administrators
            </Button>
            <Button
              sx={{ justifyContent: 'flex-start', color: 'secondary.main' }}
            >
              <Link
                to='/faqs'
                style={{ display: 'block', width: '100%', textAlign: 'left' }}
              >
                FAQs
              </Link>
            </Button>
            <Button
              sx={{ justifyContent: 'flex-start', color: 'secondary.main' }}
            >
              <Link
                to='/jobs'
                style={{ display: 'block', width: '100%', textAlign: 'left' }}
              >
                Job vacancies
              </Link>
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
          backgroundColor='primary.main'
          onClick={() => {
            setOpenQA(true)
            console.log('w')
          }}
        >
          <img
            style={{ width: '2rem', marginRight: '0.6rem' }}
            src={
              theme === darkTheme
                ? require('../images/help-light.png').default
                : require('../images/help-dark.png').default
            }
            alt='Help Icon'
          />
          <Typography color='secondary'>{language.help}!</Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default Help
