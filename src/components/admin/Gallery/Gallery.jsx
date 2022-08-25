import { Modal, CircularProgress, Stack } from '@mui/material'
import Carousel from 'react-multi-carousel'
import GalleryItem from './GalleryItem'
import 'react-multi-carousel/lib/styles.css'

const style = {
  mt: '50vh',
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
              return <GalleryItem i={i} key={i} item={item} />
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
