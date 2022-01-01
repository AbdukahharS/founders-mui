import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const QAModal = ({ openQA, setOpenQA }) => {
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
      setOpenQA(false)
    }
  }
  return (
    <>
      <Modal
        open={openQA}
        onClose={() => {
          setOpenQA(false)
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            bgcolor: 'info.light',
            py: 2,
            px: 3,
            borderRadius: 1,
          }}
        >
          <Typography color='secondary.main' fontSize='1.4rem' mb={2}>
            Do you have Suggestion or Objection?
          </Typography>
          <FormControl
            fullWidth
            color='secondary'
            sx={{ backgroundColor: 'info.light' }}
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
      </Modal>
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
    </>
  )
}

export default QAModal
