import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import {
  DataGrid,
  GridOverlay,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
} from '@mui/x-data-grid'
import { ReactComponent as Empty } from '../../images/empty.svg'
import { db } from '../../config/firebase'

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  )
}
function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport sx={{ color: 'secondary.main' }} />
    </GridToolbarContainer>
  )
}
function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
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
        <Empty color='inherit' fill='currentColor' width='12vw' height='12vw' />
        <Typography sx={{ fontSize: '1.4rem', fontWeight: '700' }}>
          No Regisations for Sunday Events
        </Typography>
      </Stack>
    </GridOverlay>
  )
}
const RegsForEvents = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [event, setEvent] = useState('')
  const [events, setEvents] = useState([])
  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(true)

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'event',
      headerName: 'Event',
      minWidth: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 150,
    },
  ]
  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      setLoad(true)
      const colRef = collection(db, 'registrations')
      const newData = []
      getDocs(colRef)
        .then((snap) => {
          snap.forEach((docRef) => {
            newData.push({ id: docRef.id, ...docRef.data() })
          })
        })
        .then(() => {
          setData(newData)
        })
        .then(() => {
          const newEvents = newData.map((reg) => {
            return reg.event
          })
          setEvents(newEvents)
        })
        .then(() => {
          setRows(newData)
          setLoad(false)
        })

        .catch((err) => {
          alert(err.message)
          console.error(err)
        })
    }
    if (pathname === '/admin/regsforevents') {
      fetchData()
    }
  }, [navigate])
  const handleClick = (eventName) => {
    const newRows = data.filter((ev) => ev.event === eventName)
    setRows(newRows)
    setEvent(eventName)
  }
  return (
    <Box style={{ height: 600, width: '100%' }}>
      <Stack direction='row' spacing={2} mb={2}>
        {events.length && !load ? (
          events.map((e, i) => (
            <Button
              key={i}
              disabled={e === event}
              sx={
                e === event
                  ? { bgcolor: '#333', color: '#aaa', cursor: 'default' }
                  : { bgcolor: 'secondary.main' }
              }
              onClick={() => handleClick(e)}
            >
              {e}
            </Button>
          ))
        ) : (
          <Typography sx={{ color: 'primary.contrastText' }}>
            No events
          </Typography>
        )}
      </Stack>
      <DataGrid
        columns={columns}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        loading={rows ? false : true}
        rows={rows}
        rowHeight={120}
      />
    </Box>
  )
}
export default RegsForEvents
