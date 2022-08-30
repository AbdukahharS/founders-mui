import { useEffect, useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { storage } from '../../config/firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'light.main',
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
  const [banner, setBanner] = useState('')
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    if (event) {
      const bannerRef = ref(storage, event.banner)
      getDownloadURL(bannerRef)
        .then((url) => {
          setBanner(url)
        })
        .then(() => {
          event.gallery.forEach((item) => {
            const itemRef = ref(storage, item.url)
            getDownloadURL(itemRef).then((url) => {
              setGallery((gallery) => {
                return [{ type: item.type, url }, ...gallery]
              })
            })
          })
        })
        .catch((err) => {
          alert(err.message)
          console.error(err)
        })
    }
  }, [event])

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
                src={banner}
                alt={`Banner for event ${event.name}`}
                style={{ maxWidth: '30vw', maxHeight: '40vh' }}
              />
              <Stack>
                <Typography fontSize={'2rem'} fontWeight={700}>
                  {event.name}
                </Typography>
                <Typography fontSize={'1.2rem'} component='pre'>
                  {event.description}
                </Typography>
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
                infinite={true}
                autoPlay={true}
                keyBoardControl={true}
                autoPlaySpeed={2000}
                pauseOnHover
                style={{ backgroundColor: '#fff' }}
              >
                {gallery.map((item, i) => {
                  return item.type === 'image' ? (
                    <img
                      key={i}
                      src={item.url}
                      alt='One of Gallery items'
                      style={{
                        width: '90%',
                        maxHeight: '30vh',
                      }}
                    />
                  ) : (
                    <Stack
                      sx={{
                        width: '90%',
                        maxHeight: '30vh',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={i}
                    >
                      <video
                        style={{ maxHeight: '30vh' }}
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
