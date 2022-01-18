import React, { useState } from 'react'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'info.light',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Input = styled('input')({
  display: 'none',
})

const CreateSundayEvent = ({ modal, setModal }) => {
  // const d = new Date()
  const [date, setDate] = useState(new Date())
  // console.log(date)

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
        <form
          method='POST'
          action='https://founders-backend.shakhzodbekkakh.repl.co/events'
          encType='multipart/form-data'
        >
          <Stack sx={style} spacing={2}>
            <Typography>Add a new Sunday Event</Typography>
            <TextField label='Name of event' variant='outlined' name='name' />
            <TextField
              label='Description of event'
              variant='outlined'
              name='description'
            />
            <TextField
              label='Intended size of event'
              variant='outlined'
              name='size'
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Basic example'
                value={date}
                onChange={(newValue) => {
                  setDate(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <label htmlFor='contained-button-file'>
              <Input
                // accept='image/*'
                id='contained-button-file'
                name='image'
                type='file'
              />
              <Button variant='raised' component='span'>
                Upload Image
              </Button>
            </label>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            <input
              type='text'
              style={{ display: 'none' }}
              name='token'
              value={localStorage.getItem('token')}
              readOnly
            />
            <input
              type='date'
              style={{ display: 'none' }}
              name='date'
              value={
                date.getFullYear() +
                '-' +
                (date.getMonth() > 8
                  ? date.getMonth() + 1
                  : '0' + (date.getMonth() + 1)) +
                '-' +
                (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
              }
              readOnly
            />
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default CreateSundayEvent
