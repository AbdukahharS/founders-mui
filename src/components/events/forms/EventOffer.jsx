import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import {
  Modal,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { db } from '../../../config/firebase'
import CancelIcon from '@mui/icons-material/Cancel'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  bgcolor: 'light.main',
  transform: 'translate(-50%, -50%)',
  p: 4,
  justifyContent: 'space-evenly',
  minWidth: '24rem',
}

const EventOffer = ({ modal, setModal, device }) => {
  const [fullname, setFullname] = useState('')
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [size, setSize] = useState(5)
  const [phone, setPhone] = useState(1111111)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (fullname && name && purpose && size && phone) {
      if (size >= 5) {
        if (phone.toString().length === 7) {
          const colRef = collection(db, 'offers')
          addDoc(colRef, {
            fullname,
            name,
            purpose,
            size,
            phone: `+998 ${phone}`,
          })
            .then(() => {
              setModal(false)
              setSuccess(true)
            })
            .catch((err) => {
              setError(err.message)
            })
        } else {
          setError('Phone number must contain 7 numbers!')
        }
      } else {
        setError('Intended size must be more than 4!')
      }
    } else {
      setError('All inputs must be filled!')
    }
  }
  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <>
          <Stack
            sx={style}
            style={device === 'xs' ? { width: '100vw', height: '100vh' } : {}}
            spacing={2}
          >
            <Stack direction='column' spacing={3}>
              <TextField
                variant='outlined'
                label='Organizer'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                color='secondary'
              />
              <TextField
                variant='outlined'
                label='What is name of the event?'
                value={name}
                onChange={(e) => setName(e.target.value)}
                color='secondary'
              />
              <TextField
                variant='outlined'
                label='What is purpose of the event?'
                multiline
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                color='secondary'
              />
              <TextField
                variant='outlined'
                label='How many is intended size?'
                value={size}
                type='number'
                onChange={(e) => {
                  setSize(Number(e.target.value))
                }}
                color='secondary'
              />
              <TextField
                variant='outlined'
                label='Give us your phone number to contact back'
                value={phone}
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
                sx={{ bgcolor: 'secondary.main' }}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Stack>
            {(device === 'xs' || device === 'xs') && (
              <CancelIcon
                onClick={() => setModal(false)}
                sx={{
                  color: '#e3242b',
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  fontSize: '2.8rem',
                }}
              />
            )}
          </Stack>
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
        </>
      </Modal>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert
          onClose={() => setSuccess(null)}
          severity='success'
          sx={{
            width: '100%',
          }}
        >
          Your suggestion is sent. Thank you for your cooperation.
        </Alert>
      </Snackbar>
    </>
  )
}
export default EventOffer
