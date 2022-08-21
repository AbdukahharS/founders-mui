import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TimePicker from '@mui/lab/TimePicker'
import { db, storage } from '../../../config/firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'light.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  minWidth: '40rem',
}
const Input = styled('input')({
  display: 'none',
})

const CreateSundayEvent = ({
  modal,
  setModal,
  rows,
  setRows,
  setTableLoad,
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [size, setSize] = useState(1)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [banner, setBanner] = useState()
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    if (name && description && size && date && time) {
      if (banner) {
        if (Number(size) > 1) {
          setLoad(true)
          const bannerName = `banner_${
            Date.now() + '.' + banner.name.split('.').reverse()[0]
          }`
          const bannerRef = ref(storage, `/sundayEvents/banner/${bannerName}`)
          uploadBytes(bannerRef, banner)
            .then((snap) => {
              setSuccess('Banner uploaded successfully!')
            })
            .then(() => {
              const dateForm =
                date.getFullYear() +
                '-' +
                (date.getMonth() > 8
                  ? date.getMonth() + 1
                  : '0' + (date.getMonth() + 1)) +
                '-' +
                (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
              const timeForm =
                (time.getHours() < 10
                  ? '0' + time.getHours()
                  : time.getHours()) +
                ':' +
                (time.getMinutes() < 10
                  ? '0' + time.getMinutes()
                  : time.getMinutes())
              const newEvent = {
                name,
                description,
                size,
                date: dateForm,
                time: timeForm,
                banner: bannerName,
                isDone: false,
                isFull: false,
                gallery: [],
              }
              addDoc(collection(db, 'sundayEvents'), newEvent)
                .then((snap) => {
                  setLoad(false)
                  setSuccess(true)
                  setModal(false)
                  setTableLoad(true)
                  setRows((r) => [{ id: snap.id, ...newEvent }, ...r])
                  setTableLoad(false)
                })
                .catch((err) => {
                  setError(err.message)
                  setLoad(false)
                })
            })
            .catch((err) => {
              setLoad(false)
              setError(err.message)
            })
        } else {
          setError('Size must be bigger than 1')
        }
      } else {
        setError('You should choose one picture!')
      }
    } else {
      setError('All inputs must be filled')
    }
  }
  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <>
          <Box>
            <form onSubmit={handleSubmit}>
              <Stack sx={style} spacing={2}>
                <Typography color='secondary.main' fontSize='2rem'>
                  Add a new Sunday Event
                </Typography>
                <TextField
                  label='Name of event'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  color='secondary'
                />
                <TextField
                  label='Description of event'
                  variant='outlined'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  maxRows={8}
                  color='secondary'
                />
                <TextField
                  label='Intended size of event'
                  variant='outlined'
                  type='number'
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
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
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='image/*'
                    id='contained-button-file'
                    onChange={(e) => setBanner(e.target.files[0])}
                    type='file'
                    required
                  />
                  <Button
                    variant='raised'
                    component='span'
                    sx={{ color: 'secondary.main' }}
                  >
                    Upload Image
                  </Button>
                </label>
                <Button onClick={handleSubmit} variant='contained'>
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
          <Snackbar
            open={error ? true : false}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              onClose={() => setError(null)}
              severity='error'
              sx={{
                width: '100%',
              }}
            >
              {error}
            </Alert>
          </Snackbar>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
          >
            <CircularProgress color='inherit' size='4rem' />
          </Backdrop>
        </>
      </Modal>
      <Snackbar
        open={success ? true : false}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity='success'
          sx={{
            width: '100%',
          }}
        >
          New event added!
        </Alert>
      </Snackbar>
    </>
  )
}
export default CreateSundayEvent
