import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from '@mui/x-data-grid'
import CreateSundayEvent from './forms/CreateSundayEvent'

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport sx={{ color: 'secondary.main' }} />
    </GridToolbarContainer>
  )
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'description',
    headerName: 'Description',
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
  },
  {
    field: 'size',
    headerName: 'Intended Size',
    type: 'date',
  },
  {
    field: 'banner',
    headerName: 'Banner',
    renderCell: (params) => (
      <img style={{ width: '100%' }} src={params.value} alt='Banner of event' />
    ),
  },
]

const SundayEvents = () => {
  const [modal, setModal] = useState(false)
  const [rows, setRows] = useState([])
  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setRows(data)
      })
      .catch((err) => console.error(err))
  })
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Button variant='contained' onClick={() => setModal(true)}>
        Add Event
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <CreateSundayEvent modal={modal} setModal={setModal} />
    </Box>
  )
}

export default SundayEvents
