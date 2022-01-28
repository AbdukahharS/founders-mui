import React, { useState } from 'react'
import { Modal, Stack, TextField, Button } from '@mui/material'
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

const RegForEvent = ({ modal, setModal, id, d, setSuccess, regs, setRegs }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const handleSubmit = () => {
    if (name && phone) {
      const newReg = {
        name,
        phone,
        id,
      }
      fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/api/regsforevents',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'no-cors',
          },
          body: JSON.stringify(newReg),
        }
      )
        .then(async (res) => {
          if (res.ok) {
            setModal(false)
            setSuccess(true)
            setRegs([...regs, id])
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('All inputs must be filled')
    }
  }
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Stack
        sx={style}
        style={d === 'xs' ? { width: '100vw', height: '100vh' } : {}}
        spacing={2}
      >
        <Stack direction='column' spacing={3}>
          <TextField
            variant='outlined'
            label='What is your name?'
            value={name}
            onChange={(e) => setName(e.target.value)}
            color='secondary'
          />
          <TextField
            variant='outlined'
            label='Give us your phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            color='secondary'
          />
          <Button onClick={handleSubmit} sx={{ bgcolor: 'secondary.main' }}>
            Submit
          </Button>
        </Stack>
        {(d === 'xs' || d === 'xs') && (
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

export default RegForEvent
