import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
  GridOverlay,
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
          Nothing found
        </Typography>
      </Stack>
    </GridOverlay>
  )
}

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 110 },
  {
    field: 'fullname',
    headerName: 'Name of Sender',
    minWidth: 150,
  },
  { field: 'name', headerName: 'Name of Event', minWidth: 150 },
  { field: 'purpose', headerName: 'Purposes', flex: 1 },
  { field: 'size', headerName: 'Size' },
  { field: 'phone', headerName: 'Phone', minWidth: 130 },
]

const EventSuggestions = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/api/eventsuggestions',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
        .then(async (res) => {
          if (res.statusCode === 401) {
            navigate('/login')
          } else if (res.ok) {
            const newData = await res.json()
            setOffers(newData)
          }
        })
        .catch((err) => console.error(err))
    }
    if (pathname === '/admin/eventsuggestions') {
      fetchData()
    }
  }, [navigate])
  return (
    <Box style={{ height: 600, width: '100%' }}>
      <DataGrid
        columns={columns}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        loading={offers ? false : true}
        rows={offers}
        rowHeight={120}
      />
    </Box>
  )
}

export default EventSuggestions
