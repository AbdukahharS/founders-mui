import React, { useEffect, useState } from 'react'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridActionsCellItem,
} from '@mui/x-data-grid'
// Icons
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// Form Modals
import CreateSundayEvent from './forms/CreateSundayEvent'
import UpdateSundayEvent from './forms/UpdateSundayEvent'
import SetIsDone from './forms/SetIsDone'
// Another Modal
import Gallery from './Gallery'

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

const SundayEvents = () => {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [isDoneModal, setIsDoneModal] = useState(false)
  const [galleryModal, setGalleryModal] = useState(false)
  const [editID, setEditID] = useState(null)
  const [gallery, setGallery] = useState(null)
  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(true)

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
        setLoad(false)
      })
      .catch((err) => console.error(err))
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 0.5,
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
    {
      field: 'gallery',
      headerName: 'Gallery',
      width: 80,
      type: 'actions',
      getActions: (params) => [
        params.row.isDone ? (
          <GridActionsCellItem
            icon={<span>See</span>}
            onClick={() => {
              setGalleryModal(true)
              setGallery(params.row.gallery)
            }}
            label='See'
          />
        ) : (
          <Typography fontSize='1.8rem'>-</Typography>
        ),
      ],
    },
    {
      field: 'banner',
      headerName: 'Banner',
      minWidth: 200,
      renderCell: (params) => (
        <img
          style={{ width: '100%' }}
          src={params.value}
          alt='Banner of event'
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setUpdateModal(true)
            setEditID(params.id)
          }}
          label='Edit'
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => deleteHandle(params.id)}
          label='Delete'
        />,
        <GridActionsCellItem
          sx={params.row.isDone ? { display: 'none' } : {}}
          icon={<CheckCircleIcon />}
          onClick={() => {
            setIsDoneModal(true)
            setEditID(params.id)
          }}
          label='SetIsDone'
        />,
      ],
    },
  ]

  const deleteHandle = (id) => {
    fetch(`https://founders-backend.shakhzodbekkakh.repl.co/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then(() => {
        const newData = rows.filter((row) => row.id !== id)
        setRows(newData)
      })
      .catch((err) => console.error(err))
  }
  return (
    <Box style={{ height: 600, width: '100%' }}>
      <Button variant='contained' onClick={() => setCreateModal(true)}>
        Add Event
      </Button>
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
      <UpdateSundayEvent
        modal={updateModal}
        setModal={setUpdateModal}
        id={editID}
        setId={setEditID}
      />
      <CreateSundayEvent modal={createModal} setModal={setCreateModal} />
      <SetIsDone modal={isDoneModal} setModal={setIsDoneModal} id={editID} />
      <Gallery
        modal={galleryModal}
        setModal={setGalleryModal}
        gallery={gallery}
      />
    </Box>
  )
}

export default SundayEvents
