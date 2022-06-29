import React from 'react'
import { Modal, CircularProgress, Stack, Button } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
const style = {
  //   position: 'absolute',
  mt: '50vh',
  //   left: '50%',
  transform: 'translateY(-50%)',
  maxWidth: '90vw',
  mx: 'auto',
  minWidth: '40rem',
  bgcolor: 'light.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
}
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
const Gallery = ({ modal, setModal, gallery }) => {
  const handleClick = (id) => {
    const elem = document.querySelector(`#${id}`)
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen()
    }
    elem.play()
  }
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Stack sx={style}>
        {gallery ? (
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            autoPlaySpeed={2000}
          >
            {gallery.map((item, i) => {
              return item.type === 'image' ? (
                <img
                  key={i}
                  src={item.url}
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
                    src={item.url}
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
            })}
          </Carousel>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </Modal>
  )
}
export default Gallery
