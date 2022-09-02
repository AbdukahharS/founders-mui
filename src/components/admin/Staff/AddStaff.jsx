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
import { collection, addDoc } from 'firebase/firestore'
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
const AddStaff = ({
  modal,
  setModal,
  setRows,
  setTableLoad,
  setSuccess,
  setError,
}) => {
  const [name, setName] = useState('')
  const [subname, setSubname] = useState('')
  const [desc, setDesc] = useState('')
  const [role, setRole] = useState('')
  const [banner, setBanner] = useState()
  const [load, setLoad] = useState(false)

  const handleSubmit = async () => {
    if (name && subname && desc && role) {
      if (banner) {
        const bannerURL = `/staff/pic_${
          Date.now() + '.' + banner.name.split('.').reverse()[0]
        }`
        const bannerRef = ref(storage, bannerURL)

        try {
          uploadBytes(bannerRef, banner).then((snapshot) => {
            setSuccess('Picture uploaded successfully!')
          })

          const member = {
            name,
            subname,
            description: desc,
            role,
            banner: bannerURL,
          }
          addDoc(collection(db, 'staff'), member).then((snap) => {
            setLoad(false)
            setTableLoad(true)
            setSuccess('Member added successfully!')
            setModal(false)
            setRows((r) => [{ id: snap.id, ...member }, ...r])
            setTableLoad(false)
            setName('')
            setSubname('')
            setDesc('')
            setBanner(undefined)
          })
        } catch (err) {
          setLoad(false)
          setError(err.message)
          console.error(err)
        }
        setLoad(true)
      } else {
        setError('Picture must be selected!')
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
                Add a new staff member
              </Typography>
              <TextField
                label='Name of the member'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                label='Subname of the member'
                variant='outlined'
                value={subname}
                onChange={(e) => setSubname(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                label='Description of the member'
                variant='outlined'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                multiline
                required
                color='secondary'
              />
              <FormControl fullWidth color='secondary'>
                <InputLabel id='category-input'>
                  Where does the member belongs?
                </InputLabel>
                <Select
                  labelId='category-input'
                  value={role}
                  label='Choose category'
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={'admin'}>{'Administrator office'}</MenuItem>
                  <MenuItem value={'instructor'}>{'Instructors'}</MenuItem>
                  <MenuItem value={'founder'}>{'Founders'}</MenuItem>
                </Select>
              </FormControl>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <label htmlFor='contained-button-banner'>
                  <Typography color='primary.contrastText' mb={2} ml={2}>
                    Please remember that aspect ratio of a picture should be 4x5
                  </Typography>
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
                    Upload picture of the member
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
export default AddStaff
