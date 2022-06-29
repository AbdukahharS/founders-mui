import React, { useState } from 'react'
import {
  Modal,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
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
const UpdateBook = ({
  modal,
  setModal,
  field,
  image,
  id,
  load,
  handleEdit,
}) => {
  const [file, setFile] = useState('')
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
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
              Upload new {field} for #{id}
            </Typography>
            {image && field === 'banner' && (
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
            )}
            <label htmlFor='contained-button-file'>
              <Input
                id='contained-button-file'
                name={field}
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                variant='raised'
                component='span'
                sx={{ color: 'secondary.main' }}
              >
                Upload {field}
              </Button>
            </label>
            <Button
              type='submit'
              variant='contained'
              onClick={() => handleEdit({ id, value: file, field })}
            >
              Submit
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  )
}
export default UpdateBook
