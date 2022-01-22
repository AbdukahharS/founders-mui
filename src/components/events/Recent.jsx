import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import RecentModal from '../modals/RecentModal'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

const Recent = () => {
  const [recents, setRecents] = useState([])
  const [modal, setModal] = useState(false)
  const [event, setEvent] = useState(null)
  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/events/recent', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setRecents(data)
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <Container>
      {recents.length === 0 ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress size='5rem' />
        </Box>
      ) : (
        <Box pt={8}>
          <Carousel responsive={responsive}>
            {recents.map((event, i) => (
              <Box
                onClick={() => {
                  setEvent(event)
                  setModal(true)
                }}
                key={i}
                sx={{
                  backgroundImage: `url(${event.banner})`,
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
                    background:
                      'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))',
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
            ))}
          </Carousel>
        </Box>
      )}
      <RecentModal modal={modal} setModal={setModal} event={event} />
    </Container>
  )
}

export default Recent
