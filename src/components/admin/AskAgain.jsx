import React from 'react'
import { Button, Modal, Paper, Stack, Typography } from '@mui/material'

const style = {
  top: '50%',
  left: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  p: 4,
}

const AskAgain = ({ modal, setModal, deleteHandle }) => {
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Paper sx={style}>
        <Typography fontSize='1.2rem'>
          Are you sure you want to delete this event?
        </Typography>
        <Stack
          direction='row'
          spacing={3}
          mt={2}
          alignItems='center'
          justifyContent='center'
        >
          <Button
            variant='contained'
            sx={{ bgcolor: 'success.main' }}
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{ bgcolor: 'error.main' }}
            onClick={deleteHandle}
          >
            Delete
          </Button>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default AskAgain
