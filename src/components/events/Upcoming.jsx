import React, { useEffect, useState } from 'react'
import {
  // Typography,
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
import RegForEvent from '../admin/forms/RegForEvent'

const Upcoming = ({ device }) => {
  const [upcomings, setUpcomings] = useState([])
  const [load, setLoad] = useState(true)
  const [modal, setModal] = useState(false)
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [regs, setRegs] = useState(
    localStorage.getItem('regs') ? localStorage.getItem('regs').split(',') : []
  )

  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/events/upcoming', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setUpcomings(data)
        setLoad(false)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (regs.length !== 0) localStorage.setItem('regs', regs.toString())
  }, [regs])
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
      ) : (
        <Stack pt={6} spacing={8}>
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
                      {regs.indexOf(upcoming.id) === -1 ? (
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
          <Snackbar
            open={success}
            onClick={() => setSuccess(false)}
            autoHideDuration={6000}
          >
            <Alert
              onClose={() => setSuccess(false)}
              sx={{
                width: '100%',
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
            >
              Your informations are sent!
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Container>
  )
}

export default Upcoming
