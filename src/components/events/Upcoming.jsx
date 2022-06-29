import React, { useEffect, useState } from 'react'
import {
  Stack,
  Container,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material'
import RegForEvent from './forms/RegForEvent'
import EventOffer from './forms/EventOffer'
import { ReactComponent as Empty } from '../../images/empty.svg'
function CustomNoRowsOverlay() {
  return (
    <Stack
      sx={{
        color: 'secondary.main',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      spacing={4}
    >
      <Empty color='inherit' fill='currentColor' width='12vw' height='12vw' />
      <Typography sx={{ fontSize: '1.4rem', fontWeight: '700' }}>
        No Upcoming Events
      </Typography>
    </Stack>
  )
}
const Upcoming = ({ device }) => {
  const [upcomings, setUpcomings] = useState([])
  const [load, setLoad] = useState(true)
  const [modal, setModal] = useState(false)
  const [offerModal, setOfferModal] = useState(false)
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [regs, setRegs] = useState(
    localStorage.getItem('regs') ? localStorage.getItem('regs').split(',') : []
  )
  useEffect(() => {
    fetch('https://founders.uz/backend/events/upcoming', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json()
          setUpcomings(data)
          setLoad(false)
        } else {
          setLoad(false)
        }
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    if (regs.length !== 0) localStorage.setItem('regs', regs.toString())
  }, [regs])
  return (
    <Container>
      <Stack pt={6} spacing={8}>
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
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 250 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name of the event</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align='right'>Register</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomings.map((upcoming, i) => (
                    <TableRow key={i}>
                      <TableCell>{upcoming.name}</TableCell>
                      <TableCell>{upcoming.date}</TableCell>
                      <TableCell align='right'>
                        {upcoming.isFull ? (
                          <Typography>This event is already full</Typography>
                        ) : regs.indexOf(upcoming.id) === -1 ? (
                          <Button
                            sx={{
                              bgcolor: 'secondary.main',
                              color: 'secondary.contrastText',
                            }}
                            onClick={() => {
                              setModal(true)
                              setId(upcoming.id)
                            }}
                          >
                            Register
                          </Button>
                        ) : (
                          <Typography>Registered</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {!upcomings.length && <CustomNoRowsOverlay />}
          </>
        )}
        <Stack
          direction='row'
          bgcolor='primary.main'
          color='primary.contrastText'
          p={device !== 'xs' ? 4 : 2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack direction='column'>
            <Typography fontSize={device !== 'xs' ? '2rem' : '1.4rem'}>
              Panning an event?
            </Typography>
            <Typography>Submit your own...</Typography>
          </Stack>
          <Button
            onClick={() => setOfferModal(true)}
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
            }}
          >
            Submit an event
          </Button>
        </Stack>
        <RegForEvent
          modal={modal}
          setModal={setModal}
          id={id}
          d={device}
          setSuccess={setSuccess}
          regs={regs}
          setRegs={setRegs}
        />
        <EventOffer
          modal={offerModal}
          setModal={setOfferModal}
          device={device}
        />
        <Snackbar
          open={success}
          onClick={() => setSuccess(false)}
          autoHideDuration={6000}
        >
          <Alert
            onClose={() => setSuccess(false)}
            sx={{
              width: '100%',
            }}
          >
            Your informations are sent!
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  )
}
export default Upcoming
