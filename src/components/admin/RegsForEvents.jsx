import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
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
  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(true)

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'time',
    },
    {
      field: 'size',
      headerName: 'Intended Size',
      type: 'date',
    },
    {
      field: 'isDone',
      headerName: 'Is Done',
      type: 'boolean',
    },
  ]

  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/regsforevents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        setRows(data)
        setLoad(false)
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
        loading={load}
        rows={rows}
        rowHeight={120}
      />
    </Box>
  )
}

export default RegsForEvents
