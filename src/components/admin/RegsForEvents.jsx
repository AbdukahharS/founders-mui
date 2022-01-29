import React, { useEffect, useState } from 'react'
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import {
  DataGrid,
  GridOverlay,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
} from '@mui/x-data-grid'

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

const RegsForEvents = () => {
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
        if (res.ok) {
          const newData = await res.json()
          setData(newData)
          const newEvents = await newData.map((event) => {
            return event.name
          })
          setEvents(newEvents)
          const newEvent = await newEvents[0]
          setEvent(newEvent)
          const newRows = await newData[0].registrations
          setRows(newRows)
          setLoad(false)
        }
      })
      .catch((err) => console.error(err))
  }, [])
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
        }}
        loading={rows ? false : true}
        rows={rows}
        rowHeight={120}
      />
    </Box>
  )
}

export default RegsForEvents
