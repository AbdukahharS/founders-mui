import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Stack, Button, Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
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
  id,
  setSuccess,
  setError,
  rows,
  setRows,
}) => {
  const [images, setImages] = useState('')
  const [videos, setVideos] = useState('')
  const [load, setLoad] = useState(false)
  const handleClick = async () => {
    const imgExt = ['png', 'jpg', 'jpeg', 'webp']
    const vidExt = ['mp4', 'mkv', 'mov', 'avi']
    if (typeof videos === 'object' ? videos.length : true) {
      if (typeof videos === 'object' ? videos.length : true) {
        if (images.length <= 5) {
          if (videos.length <= 5) {
            setLoad(true)
            const galleryForm = new FormData()
            Array.from(images).forEach((image) => {
              if (imgExt.indexOf(image.type.replace('image/', '')) === -1) {
                setError(
                  'Please, upload PNG, JPG, JPEG or WEBP file for images'
                )
              } else {
                galleryForm.append('images', image)
              }
            })
            Array.from(videos).forEach((video) => {
              if (vidExt.indexOf(video.type.replace('video/', '')) === -1) {
                setError('Please, upload MP4, MKV, MOV or AVI file for videos')
              } else {
                galleryForm.append('videos', video)
              }
            })
            galleryForm.append('token', localStorage.getItem('token'))
            Array.from(galleryForm).forEach((video) => console.log(video))
            const res = await axios.put(
              `https://founders.uz/backend/events/${id}`,
              galleryForm,
              {
                headers: {
                  'x-access-token': localStorage.getItem('token'),
                },
                onUploadProgress: (p) => console.log(p),
              }
            )
            try {
              console.log(res)
              const { data } = res
              if (res.status !== 200) {
                throw new Error(data.message)
              } else {
                setRows(rows.map((row) => (id === row.id ? data.body : row)))
                setLoad(false)
                setSuccess(data.message)
                setModal(false)
              }
            } catch (err) {
              setLoad(false)
              setError(err.message)
              console.error(err.message)
            }
          } else {
            setError('You can not upload more than 5 videos')
          }
        } else {
          setError('You can not upload more than 5 images')
        }
      } else {
        setError('You should choose at least one file for videos')
      }
    } else {
      setError('You should choose at least one file for images')
    }
  }
  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Stack sx={style}>
          <Stack direction='row' justifyContent='space-between' mb={2}>
            <label htmlFor='contained-button-images'>
              <Input
                accept='image/*'
                multiple
                id='contained-button-images'
                type='file'
                onChange={(e) => setImages(e.target.files)}
              />
              <Button
                variant='raised'
                component='span'
                sx={{ color: 'secondary.main' }}
              >
                Upload Images
              </Button>
            </label>
            <label htmlFor='contained-button-videos'>
              <Input
                accept='video/*'
                multiple
                id='contained-button-videos'
                type='file'
                onChange={(e) => setVideos(e.target.files)}
              />
              <Button
                variant='raised'
                component='span'
                sx={{ color: 'secondary.main' }}
              >
                Upload Videos
              </Button>
            </label>
          </Stack>
          <Button type='button' variant='contained' onClick={handleClick}>
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
