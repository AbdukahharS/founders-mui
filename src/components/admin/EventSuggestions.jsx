import React, { useState, useEffect } from 'react'
import { Box, LinearProgress } from '@mui/material'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
  GridOverlay,
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
  const [offers, setOffers] = useState([])

  useEffect(() => {
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
        if (res.ok) {
          const newData = await res.json()
          setOffers(newData)
        }
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <Box style={{ height: 600, width: '100%' }}>
      <DataGrid
        columns={columns}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: CustomToolbar,
        }}
        loading={offers ? false : true}
        rows={offers}
        rowHeight={120}
      />
    </Box>
  )
}

export default EventSuggestions
