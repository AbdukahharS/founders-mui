import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TimePicker from '@mui/lab/TimePicker'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '40rem',
  bgcolor: 'light.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Input = styled('input')({
  display: 'none',
})

const UpdateSundayEvent = ({ modal, setModal, id, setId }) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState('')
  const [date, setDate] = useState(new Date())
  const [image, setImage] = useState('')
  const [isDone, setIsDone] = useState('')
  const [time, setTime] = useState(new Date())
  const [load, setLoad] = useState(true)

  useEffect(() => {
    id &&
      fetch(`https://founders-backend.shakhzodbekkakh.repl.co/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
        },
      })
        .then(async (res) => {
          const data = await res.json()
          setName(data.name)
          setDesc(data.description)
          setSize(data.size)
          setDate(new Date(data.date))
          setImage(data.banner)
          setIsDone(data.isDone)
          if (data.time) {
            const hour = data.time.split(':')[0]
            const min = data.time.split(':')[1]
            const d = new Date()
            d.setHours(hour, min)
            setTime(d)
          }
          setLoad(false)
        })
        .catch((err) => console.error(err))
  }, [id])

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
        <form
          method='post'
          action={`https://founders-backend.shakhzodbekkakh.repl.co/events/${id}`}
          encType='multipart/form-data'
        >
          {load ? (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ) : (
            <Stack
              sx={style}
              spacing={2}
              justifyContent='space-between'
              align='flex-start'
            >
              <Typography color='secondary.main'>
                Edit Sunday Event #{id}
              </Typography>
              <TextField
                label='Name of event'
                variant='outlined'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                label='Description of event'
                variant='outlined'
                name='description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                label='Intended size of event'
                variant='outlined'
                name='size'
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                color='secondary'
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Basic example'
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} color='secondary' />
                  )}
                />
                <TimePicker
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} color='secondary' />
                  )}
                />
              </LocalizationProvider>
              <Box>
                <img
                  src={image}
                  alt='Banner of the event'
                  style={{
                    maxHeight: '20rem',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              </Box>
              <label htmlFor='contained-button-file'>
                <Input
                  accept='image/*'
                  id='contained-button-file'
                  name='image'
                  type='file'
                />
                <Button
                  variant='raised'
                  component='span'
                  sx={{ color: 'secondary.main' }}
                >
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
              <input
                type='time'
                style={{ display: 'none' }}
                name='time'
                value={
                  typeof time === 'object'
                    ? `${
                        time.getHours() < 10
                          ? '0' + time.getHours()
                          : time.getHours()
                      }:${
                        time.getMinutes() < 10
                          ? '0' + time.getMinutes()
                          : time.getMinutes()
                      }`
                    : time
                }
                readOnly
              />
              <input
                type='text'
                name='isDone'
                value={isDone}
                style={{ display: 'none' }}
                readOnly
              />
            </Stack>
          )}
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateSundayEvent
