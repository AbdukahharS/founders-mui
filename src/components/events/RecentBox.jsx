import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../config/firebase'

const RecentBox = ({ event, setEvent, setModal }) => {
  const [banner, setBanner] = useState('')

  useEffect(() => {
    if (event) {
      const bannerRef = ref(storage, event.banner)
      getDownloadURL(bannerRef)
        .then((url) => {
          setBanner(url)
        })
        .catch((err) => {
          alert(err.message)
          console.error(err)
        })
    }
  }, [event])

  return (
    <Box
      onClick={() => {
        setEvent(event)
        setModal(true)
      }}
      sx={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '50vh',
        width: '90%',
        borderRadius: '1rem',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))',
          borderRadius: '1rem',
        }}
      ></Box>
      <Typography
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '2rem',
          color: '#f4d40d',
          fontSize: '1.8rem',
          fontWeight: 700,
        }}
      >
        {event.name}
      </Typography>
    </Box>
  )
}

export default RecentBox
