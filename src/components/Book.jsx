import { useState, useEffect } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { Typography, Stack } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import CircularProgress from '@mui/material/CircularProgress'
import { storage } from '../config/firebase'

const Book = ({ book, device }) => {
  const [banner, setBanner] = useState(null)
  const [file, setFile] = useState(null)
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const bannerRef = ref(storage, `/library/banner/${book.banner}`)
    const fileRef = ref(storage, `/library/file/${book.file}`)
    const audioRef = book.audio && ref(storage, `/library/audio/${book.audio}`)

    getDownloadURL(bannerRef)
      .then((url) => {
        setBanner(url)
      })
      .catch((err) => {
        console.log(book.banner, book.name)
        console.error(err)
      })
    getDownloadURL(fileRef)
      .then((url) => {
        setFile(url)
      })
      .catch((err) => {
        console.log(book.file, book.name)
        console.error(err)
      })
    if (audioRef) {
      getDownloadURL(audioRef)
        .then((url) => {
          setAudio(url)
        })
        .catch((err) => {
          console.log(book.audio, book.name)
          console.error(err)
        })
    }
  }, [book])

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      py={1}
      px={device === 'xs' || device === 'sm' ? 0 : 4}
      spacing={device === 'xs' || device === 'sm' ? 1 : 4}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        {banner ? (
          <img style={{ height: '8rem' }} src={banner} alt='blah' />
        ) : (
          <CircularProgress />
        )}
        <Stack>
          <Typography fontSize='1.4rem' color='secondary'>
            {book.name}
          </Typography>
          {audio && (
            <a href={audio} download>
              <Typography
                fontSize='1.2rem'
                color='secondary'
                sx={{ textDecoration: 'underline' }}
              >
                Download Audio
              </Typography>
            </a>
          )}
        </Stack>
      </Stack>
      <a href={file} download>
        <DownloadIcon sx={{ color: 'secondary.main' }} />
      </a>
    </Stack>
  )
}

export default Book
