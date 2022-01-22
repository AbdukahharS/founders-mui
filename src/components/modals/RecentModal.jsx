import React from 'react'
import { Box, CircularProgress, Modal, Stack, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'info.light',
  p: 4,
  borderRadius: '1rem',
  boxShadow: '1px 1px 4px rgba(0,0,0,0.6)',
  maxWidth: '90vw',
  width: 'fit-content',
  minWidth: '60vw',
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
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

const RecentModal = ({ modal, setModal, event }) => {
  console.log(event)
  return (
    <Modal
      open={modal}
      onClose={() => {
        setModal(false)
      }}
    >
      <Stack sx={style} color='primary.contrastText'>
        {event ? (
          <Stack direction='column'>
            <Stack direction='row' spacing={4}>
              <img
                src={event.banner}
                alt={`Banner for event ${event.name}`}
                style={{ width: '30vw', maxHeight: '40vh' }}
              />
              <Stack>
                <Typography fontSize={'2rem'} fontWeight={700}>
                  {event.name}
                </Typography>
                <Typography fontSize={'1.2rem'}>{event.description}</Typography>
              </Stack>
            </Stack>
            <Typography textAlign='center' my={2} fontSize='1.8rem'>
              Some pictures from the event:
            </Typography>
            <Box width='80vw'>
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                keyBoardControl={true}
                autoPlaySpeed={2000}
              >
                {event.gallery.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt='One of Gallery items'
                    style={{
                      width: '90%',
                      maxHeight: '40vh',
                      margin: '2rem 0',
                    }}
                  />
                ))}
              </Carousel>
            </Box>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </Modal>
  )
}

export default RecentModal
