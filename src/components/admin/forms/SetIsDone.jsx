import React from 'react'
import { Box, Modal, Stack, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

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

const SetIsDone = ({ modal, setModal, id }) => {
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
        <form
          method='post'
          action={`https://founders-backend.shakhzodbekkakh.repl.co/events/setisdone/${id}`}
          encType='multipart/form-data'
        >
          <Stack sx={style}>
            <label htmlFor='contained-button-file'>
              <Input
                accept='image/*'
                multiple
                id='contained-button-file'
                name='gallery'
                type='file'
                onChange={(e) => console.log(e)}
              />
              <Button variant='raised' component='span'>
                Upload Images
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
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default SetIsDone
