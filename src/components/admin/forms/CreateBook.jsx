import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
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
const CreateBook = ({
  modal,
  setModal,
  rows,
  setRows,
  setTableLoad,
  setSuccess,
  setError,
  categories,
}) => {
  const [name, setName] = useState('')
  const [banner, setBanner] = useState()
  const [file, setFile] = useState()
  const [audio, setAudio] = useState()
  const [load, setLoad] = useState(false)
  const [category, setCategory] = useState('')
  const handleSubmit = async () => {
    if (name && category) {
      if (banner && file) {
        setLoad(true)
        const newEvent = new FormData()
        newEvent.append('name', name)
        newEvent.append('category', category)
        newEvent.append('banner', banner)
        newEvent.append('file', file)
        if (audio) {
          newEvent.append('audio', audio)
        }
        newEvent.append('token', localStorage.getItem('token'))
        const res = await fetch('https://founders.uz/backend/books', {
          headers: { 'x-access-token': localStorage.getItem('token') },
          method: 'POST',
          body: newEvent,
        })
        try {
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.message)
          } else {
            setLoad(false)
            setSuccess(data.message)
            setModal(false)
            setTableLoad(true)
            const newRows = [...rows, data.body]
            setRows(newRows)
            setTableLoad(false)
            setName('')
            setCategory('')
            setBanner(undefined)
            setFile(undefined)
            setAudio(undefined)
          }
        } catch (err) {
          setLoad(false)
          setError(err.message)
          console.error(err)
        }
      } else {
        setError('Banner and file must be selected!')
      }
    } else {
      setError('All inputs must be filled')
    }
  }
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <>
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack sx={style} spacing={2}>
              <Typography color='secondary.main' fontSize='2rem'>
                Add a new Book
              </Typography>
              <TextField
                label='Name of book'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                color='secondary'
              />
              <FormControl fullWidth color='secondary'>
                <InputLabel id='category-input'>Choose category</InputLabel>
                <Select
                  labelId='category-input'
                  value={category}
                  label='Choose category'
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <label htmlFor='contained-button-banner'>
                  <Input
                    accept='image/*'
                    id='contained-button-banner'
                    onChange={(e) => setBanner(e.target.files[0])}
                    type='file'
                    required
                  />
                  <Button
                    variant='raised'
                    component='span'
                    sx={{ color: 'secondary.main' }}
                  >
                    Upload Banner
                  </Button>
                </label>
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='application/pdf'
                    id='contained-button-file'
                    onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    required
                  />
                  <Button
                    variant='raised'
                    component='span'
                    sx={{ color: 'secondary.main' }}
                  >
                    Upload Book file
                  </Button>
                </label>
                <label htmlFor='contained-button-audio'>
                  <Input
                    accept='audio/mp3, audio/m4a, audio/ogg, archive/zip, archive/rar'
                    id='contained-button-audio'
                    onChange={(e) => setAudio(e.target.files[0])}
                    type='file'
                  />
                  <Button
                    variant='raised'
                    component='span'
                    sx={{ color: 'secondary.main' }}
                  >
                    Upload Audio
                  </Button>
                </label>
              </Stack>
              <Button onClick={handleSubmit} variant='contained'>
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}
        >
          <CircularProgress color='inherit' size='4rem' />
        </Backdrop>
      </>
    </Modal>
  )
}
export default CreateBook
