import React from 'react'
import { Box, Modal, CircularProgress } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const style = {
  //   position: 'absolute',
  mt: '50vh',
  //   left: '50%',
  transform: 'translateY(-50%)',
  maxWidth: '90vw',
  mx: 'auto',
  minWidth: '40rem',
  bgcolor: 'info.light',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box sx={style}>
        {gallery ? (
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
            {gallery.map((item, ind) => (
              <img
                key={ind}
                src={item}
                alt='Gallery item'
                style={{ width: '90%', margin: '1rem 0' }}
              />
            ))}
          </Carousel>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Modal>
  )
}

export default Gallery
