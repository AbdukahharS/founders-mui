import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Stack,
  Typography,
  LinearProgress,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  GridToolbarExport,
  GridOverlay,
  GridToolbarContainer,
  gridClasses,
  DataGrid,
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
          No Sunday Events
        </Typography>
      </Stack>
    </GridOverlay>
  )
}
const columns = [
  { field: 'id', headerName: 'ID', minWidth: 110 },
  { field: 'name', headerName: 'Name', minWidth: 220, editable: true },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: ['admin', 'user'],
    editable: true,
  },
]
const Users = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)
  const [rows, setRows] = useState([])
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      fetch('https://founders.uz/backend/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      })
        .then(async (res) => {
          if (res.statusCode === 401) {
            navigate('/login')
          } else if (res.ok) {
            const data = await res.json()
            setRows(data)
            setLoad(false)
          }
        })
        .catch((err) => console.error(err))
    }
    if (pathname === '/admin/users') {
      fetchData()
    }
  }, [navigate])
  const handleEdit = async (params, event) => {
    const { id, value } = params
    let body
    if (params.field === 'name') {
      body = JSON.stringify({ name: value })
    } else {
      body = JSON.stringify({ status: value })
    }
    const res = await fetch(`https://founders.uz/backend/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: body,
    })
    const data = await res.json()
    setSuccess(data.message)
  }
  return (
    <>
      <Box style={{ height: 600, width: '100%' }}>
        <DataGrid
          columns={columns}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          loading={load}
          rows={rows}
          rowHeight={120}
          onCellEditCommit={handleEdit}
        />
      </Box>
      <Snackbar
        open={success ? true : false}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity='success'
          sx={{
            width: '100%',
          }}
        >
          {success}
        </Alert>
      </Snackbar>
    </>
  )
}
export default Users
