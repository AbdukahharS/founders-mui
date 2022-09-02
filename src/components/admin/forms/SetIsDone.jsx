import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { Modal, Stack, Button, Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { storage, db } from '../../../config/firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'light.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const Input = styled('input')({
  display: 'none',
})
const SetIsDone = ({
  modal,
  setModal,
  event,
  setSuccess,
  setError,
  setRows,
  rows,
}) => {
  const [files, setFiles] = useState('')
  const [load, setLoad] = useState(false)

  const handleClick = async () => {
    if (typeof files === 'object' ? files.length : true) {
      if (files.length <= 10) {
        setLoad(true)
        const docRef = doc(db, 'sundayEvents', event.id)
        const gallery = []
        Array.from(files).forEach((file) => {
          const fileType = file.type.split('/')[0]
          if (fileType === 'video' || fileType === 'image') {
            const fileUrl = `/sundayEvents/gallery/gallery-item_${
              Date.now() + '.' + file.name.split('.').reverse()[0]
            }`
            const fileRef = ref(storage, fileUrl)
            gallery.push({ type: fileType, url: fileUrl })
            const change = {
              isDone: true,
              gallery,
            }
            uploadBytes(fileRef, file)
              .then(() => {
                updateDoc(docRef, change).catch((err) => {
                  setLoad(false)
                  setError(err.message)
                })
              })
              .then(() => {
                setRows(
                  rows.map((row) =>
                    row.id === event.id ? { ...row, ...change } : row
                  )
                )
              })
              .then(() => {
                setLoad(false)
                setModal(false)
                setSuccess('Success!')
              })
              .catch((err) => {
                setLoad(false)
                setError(err.message)
              })
          } else {
            setLoad(false)
            return setError('You need to choose image(s) and/or video(s)!')
          }
        })
      } else {
        setError('You can not upload more than 10 files!')
      }
    } else {
      setError('You have to choose at least one file!')
    }
  }

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Stack sx={style}>
          <Stack direction='row' justifyContent='center' mb={2}>
            <label htmlFor='contained-button-files'>
              <Input
                multiple
                id='contained-button-files'
                type='file'
                onChange={(e) => setFiles(e.target.files)}
              />
              <Button
                variant='raised'
                component='span'
                sx={{ color: 'secondary.main' }}
              >
                Select Files
              </Button>
            </label>
          </Stack>
          <Button type='button' variant='contained' onClick={handleClick}>
            Submit
          </Button>
        </Stack>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color='inherit' size='4rem' />
      </Backdrop>
    </>
  )
}
export default SetIsDone
