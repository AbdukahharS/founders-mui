import { useState, useEffect } from 'react'
import { Stack, Button } from '@mui/material'
import { ref, getDownloadURL } from 'firebase/storage'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { storage } from '../../../config/firebase'

const GalleryItem = ({ item, i }) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (item.url) {
      const itemRef = ref(storage, item.url)
      getDownloadURL(itemRef).then((url) => {
        setUrl(url)
      })
    }
  }, [item.url])

  const handleClick = (id) => {
    const elem = document.querySelector(`#${id}`)
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
    elem.play()
  }

  return item.type === 'image' ? (
    <img
      key={i}
      src={url}
      alt='One of Gallery items'
      style={{
        width: '90%',
        maxHeight: '40vh',
      }}
    />
  ) : (
    <Stack
      sx={{
        maxHeight: '40vh',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      key={i}
    >
      <video
        style={{ maxHeight: '40vh', width: '100%' }}
        src={url}
        id={`video${i}`}
      />
      <Button
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => handleClick(`video${i}`)}
      >
        <PlayArrowIcon color='gold' sx={{ fontSize: '4rem' }} />
      </Button>
    </Stack>
  )
}

export default GalleryItem
