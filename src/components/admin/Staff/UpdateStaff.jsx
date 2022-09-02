import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage'
import { Modal, Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { db, storage } from '../../../config/firebase'

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

const UpdateStaff = ({
  modal,
  setModal,
  setSuccess,
  member,
  setStaff,
  staff,
}) => {
  const [file, setFile] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (member) {
      const itemRef = ref(storage, member.banner)
      getDownloadURL(itemRef)
        .then((url) => {
          setUrl(url)
        })
        .catch((err) => console.error(err))
    }
  }, [member, url])

  const handleEdit = async () => {
    if (file) {
      const docRef = ref(storage, member.banner)
      await deleteObject(docRef).then((snap) => {
        setSuccess(`Old picture deleted successfully!`)
      })
      const newDocURL = `/staff/pic_${
        Date.now() + '.' + file.name.split('.').reverse()[0]
      }`
      const newDocRef = ref(storage, newDocURL)
      await uploadBytes(newDocRef, file).then(() =>
        setSuccess(`New picture uploaded successfully!`)
      )
      const bookRef = doc(db, 'staff', member.id)
      const change = { banner: newDocURL }
      await updateDoc(bookRef, change)
        .then(() => {
          const newStaff = staff.map((item) => {
            if (member.id === item.id) {
              return { ...member, ...change }
            } else {
              console.log('smth2')
              return item
            }
          })
          setStaff(newStaff)
        })
        .then(() => {
          setSuccess('Updated successfully!')
          setModal(false)
        })
    } else {
      return alert(`Select picture`)
    }
  }

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box>
        <Stack
          sx={style}
          spacing={2}
          justifyContent='space-between'
          align='flex-start'
        >
          <Typography color='secondary.main'>
            Upload new picture for {member.name}
          </Typography>
          <Box>
            <img
              src={url}
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
              id='contained-button-file'
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              variant='raised'
              component='span'
              sx={{ color: 'secondary.main' }}
            >
              Select image
            </Button>
          </label>
          <Button
            type='submit'
            variant='contained'
            onClick={() => handleEdit()}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
export default UpdateStaff
