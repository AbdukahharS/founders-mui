import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
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
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ReactComponent as Empty } from '../../images/empty.svg'
// Form Modals
import CreateSundayEvent from './forms/CreateSundayEvent'
import UpdateSundayEvent from './forms/UpdateSundayEvent'
import SetIsDone from './forms/SetIsDone'
// Another Modal
import Gallery from './Gallery'
import Banner from './Banner'
import AskAgain from './AskAgain'

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

const SundayEvents = () => {
  const navigate = useNavigate()
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [isDoneModal, setIsDoneModal] = useState(false)
  const [galleryModal, setGalleryModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editID, setEditID] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [gallery, setGallery] = useState(null)
  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      fetch('https://founders-backend.shakhzodbekkakh.repl.co/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
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
    if (pathname === '/admin/sundayevents') {
      fetchData()
    }
  }, [navigate])

  const deleteHandle = () => {
    fetch(
      `https://founders-backend.shakhzodbekkakh.repl.co/api/events/${deleteId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
        },
      }
    )
      .then(() => {
        const newData = rows.filter((row) => row.id !== deleteId)
        setRows(newData)
        setDeleteModal(false)
      })
      .catch((err) => console.error(err))
  }

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 160,
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
      headerName: 'Size',
      width: 80,
      type: 'number',
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
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => {
            setUrl(params.row.banner)
          }}
          label='See'
        />,
      ],
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
          onClick={() => {
            setDeleteModal(true)
            setDeleteId(params.id)
          }}
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
          NoRowsOverlay: CustomNoRowsOverlay,
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
      <CreateSundayEvent
        modal={createModal}
        setModal={setCreateModal}
        rows={rows}
        setRows={setRows}
        setTableLoad={setLoad}
      />
      <SetIsDone modal={isDoneModal} setModal={setIsDoneModal} id={editID} />
      <Gallery
        modal={galleryModal}
        setModal={setGalleryModal}
        gallery={gallery}
      />
      <Banner url={url} setUrl={setUrl} />
      <AskAgain
        modal={deleteModal}
        setModal={setDeleteModal}
        id={deleteId}
        deleteHandle={deleteHandle}
      />
    </Box>
  )
}

export default SundayEvents
