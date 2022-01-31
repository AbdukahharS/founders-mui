import React, { useEffect, useState } from 'react'
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
      field: 'phone',
      headerName: 'Phone',
      minWidth: 150,
    },
  ]

  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/api/regsforevents',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
        .then(async (res) => {
          if (res.status === 401) {
            navigate('/login')
          } else if (res.status === 200) {
            const newData = await res.json()
            setData(newData)
            const newEvents = await newData.map((event) => {
              return event.name
            })
            setEvents(newEvents)
            const newEvent = await newEvents[0]
            setEvent(newEvent)
            const newRows = (await newData[0]) ? newData[0].registrations : []
            setRows(newRows)
            setLoad(false)
          }
        })
        .catch((err) => console.error(err))
    }
    if (pathname === '/admin/regsforevents') {
      fetchData()
    }
  }, [navigate])
  const handleClick = (eventName) => {
    const newRows = data.filter((ev) => ev.name === eventName)
    setRows(newRows[0].registrations)
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
