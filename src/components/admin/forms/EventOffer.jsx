import React from 'react'
import { Modal, Stack, TextField, InputAdornment, Button } from '@mui/material'
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
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Stack
        sx={style}
        style={device === 'xs' ? { width: '100vw', height: '100vh' } : {}}
        spacing={2}
      >
        <Stack direction='column' spacing={3}>
          <TextField variant='outlined' label='What is your name?' error />
          <TextField variant='outlined' label='What is name of the event?' />
          <TextField variant='outlined' label='What is purpose of the event?' />
          <TextField variant='outlined' label='How many is intended size?' />
          <TextField
            variant='outlined'
            label='Give us your phone number to contact back'
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              startAdornment: (
                <InputAdornment position='start'>+998</InputAdornment>
              ),
            }}
          />
          <Button sx={{ bgcolor: 'secondary.main' }}>Submit</Button>
        </Stack>
        {(device === 'xs' || device === 'xs') && (
          <CancelIcon
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
    </Modal>
  )
}

export default EventOffer
