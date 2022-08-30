import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import RecentModal from '../modals/RecentModal'
import { db } from '../../config/firebase'
import { ReactComponent as Empty } from '../../images/empty.svg'
import RecentBox from './RecentBox'

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
  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true)
    const colRef = collection(db, 'sundayEvents')
    const q = query(colRef, where('isDone', '==', true))
    getDocs(q)
      .then((snap) => {
        snap.forEach((docRef) => {
          const c = recents.map((d) => {
            return d.id === docRef.id && d
          })
          if (!c.length) {
            setRecents((recents) => [
              { id: docRef.id, ...docRef.data() },
              ...recents,
            ])
          }
        })
      })
      .then(() => {
        setLoad(false)
      })
      .catch((err) => {
        alert(err.message)
        setLoad(false)
        console.error(err)
      })
  }, [recents])
  return (
    <Container>
      {load ? (
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
      ) : recents.length ? (
        <Box pt={8}>
          <Carousel responsive={responsive}>
            {recents.map((event) => (
              <RecentBox
                event={event}
                key={event.id}
                setEvent={setEvent}
                setModal={setModal}
              />
            ))}
          </Carousel>
        </Box>
      ) : (
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'secondary.main',
            direction: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          spacing={4}
        >
          <Empty
            color='inherit'
            fill='currentColor'
            width='16vw'
            height='16vw'
          />
          <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>
            No Recent Events
          </Typography>
        </Stack>
      )}
      <RecentModal modal={modal} setModal={setModal} event={event} />
    </Container>
  )
}
export default Recent
