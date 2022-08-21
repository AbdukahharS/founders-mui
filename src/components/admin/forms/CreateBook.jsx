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
import { collection, addDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
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
const CreateBook = ({
  modal,
  setModal,
  setRows,
  rows,
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
        const bannerName = `banner_${
          Date.now() + '.' + banner.name.split('.').reverse()[0]
        }`
        const fileName = `file${
          Date.now() + '.' + file.name.split('.').reverse()[0]
        }`
        const audioName =
          audio &&
          `audio_${Date.now() + '.' + audio.name.split('.').reverse()[0]}`
        const bannerRef = ref(storage, `/library/banner/${bannerName}`)
        const fileRef = ref(storage, `/library/file/${fileName}`)
        const audioRef = audio && ref(storage, `/library/audio/${audioName}`)
        try {
          uploadBytes(bannerRef, banner).then((snapshot) => {
            setSuccess('Banner uploaded successfully!')
          })
          uploadBytes(fileRef, file).then((snapshot) => {
            setSuccess('File uploaded successfully!')
          })
          if (audio) {
            uploadBytes(audioRef, audio).then((snapshot) => {
              setSuccess('Audio uploaded successfully!')
            })
          }
          const book = {
            name,
            banner: bannerName,
            file: fileName,
            category: doc(db, 'categories', category),
            audio: audio ? audioName : null,
          }
          addDoc(collection(db, 'library'), book).then((snap) => {
            setLoad(false)
            setTableLoad(true)
            setSuccess('Book added successfully!')
            setModal(false)
            setRows([{ id: snap.id, ...book }, ...rows])
            setTableLoad(false)
            setName('')
            setCategory('')
            setBanner(undefined)
            setFile(undefined)
            setAudio(undefined)
          })
        } catch (err) {
          setLoad(false)
          setError(err.message)
          console.error(err)
        }
        setLoad(true)
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
                    <MenuItem key={i} value={category.id}>
                      {category.name}
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
