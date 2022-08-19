import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore'
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
import { db } from '../../config/firebase'
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
  { field: 'displayName', headerName: 'Name', minWidth: 220, editable: true },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'admin',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: ['admin', 'user'],
    editable: true,
    valueGetter: (params) => {
      return params.row.admin === true ? 'admin' : 'user'
    },
  },
]
const Users = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)
  const [rows, setRows] = useState([])
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    setLoad(true)
    const pathname = window.location.pathname
    const fetchData = async () => {
      getDocs(collection(db, 'profiles'), {})
        .then((snap) => {
          snap.forEach((doc) => {
            setRows((r) => [{ id: doc.id, ...doc.data() }, ...r])
          })
          setLoad(false)
        })
        .catch((err) => {
          console.error(err)
          alert(err.message)
        })
    }
    if (pathname === '/admin/users') {
      fetchData()
    }
  }, [navigate])
  const handleEdit = async (params, event) => {
    const { id, value, field } = params
    const docRef = doc(db, 'profiles', id)
    if (field === 'displayName') {
      await updateDoc(docRef, { displayName: value })
    } else {
      await updateDoc(docRef, {
        admin: value === 'admin',
      })
    }
    setSuccess('Updated successfully!')
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
