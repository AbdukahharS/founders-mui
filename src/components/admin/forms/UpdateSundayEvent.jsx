import { useState, useEffect } from 'react'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
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
import { doc, updateDoc } from 'firebase/firestore'
import { storage, db } from '../../../config/firebase'

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

const UpdateSundayEvent = ({
  modal,
  setModal,
  event,
  setError,
  setSuccess,
  setRows,
}) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState('')
  const [date, setDate] = useState(new Date())
  const [banner, setBanner] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [time, setTime] = useState(new Date())
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if (event) {
      const bannerRef = ref(storage, event.banner)
      getDownloadURL(bannerRef).then((url) => {
        setName(event.name)
        setDesc(event.description)
        setSize(event.size)
        setDate(new Date(event.date))
        setBannerUrl(url)
        if (event.time) {
          const hour = event.time.split(':')[0]
          const min = event.time.split(':')[1]
          const d = new Date()
          d.setHours(hour, min)
          setTime(d)
        }
      })

      setLoad(false)
    }
  }, [event])

  const handleClick = async () => {
    setLoad(true)
    if (event) {
      const docRef = doc(db, 'sundayEvents', event.id)
      const updatedEvent = {
        name,
        desc,
        size: Number(size),
        date:
          date.getFullYear() +
          '-' +
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : '0' + (date.getMonth() + 1)) +
          '-' +
          (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()),
        time: `${
          time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
        }:${
          time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
        }`,
      }
      if (banner) {
        const bannerUrl = `/sundayEvents/banner/banner_${
          Date.now() + '.' + banner.type.split('/')[1]
        }`
        updatedEvent.banner = bannerUrl
        const bannerRef = ref(storage, bannerUrl)
        deleteObject(ref(storage, event.banner)).then(() => {
          uploadBytes(bannerRef, banner).catch((err) => {
            setLoad(false)
            setError(err.message)
            console.error(err)
          })
        })
      }
      updateDoc(docRef, updatedEvent)
        .then(() => {
          setRows((rows) =>
            rows.map((row) => {
              return row.id === event.id ? { ...row, ...updatedEvent } : row
            })
          )
        })
        .then(() => {
          setLoad(false)
          setModal(false)
          setSuccess('Updated successfully!')
        })
        .catch((err) => {
          setLoad(false)
          setError(err.message)
        })
    }
  }

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
        <form encType='multipart/form-data'>
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
                Edit Sunday Event #{event.id}
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
                multiline
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
                  src={bannerUrl}
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
                  onChange={(e) => setBanner(e.target.files[0])}
                />
                <Button
                  variant='raised'
                  component='span'
                  sx={{ color: 'secondary.main' }}
                >
                  Upload Image
                </Button>
              </label>
              <Button onClick={handleClick} variant='contained'>
                Submit
              </Button>
            </Stack>
          )}
        </form>
      </Box>
    </Modal>
  )
}
export default UpdateSundayEvent
