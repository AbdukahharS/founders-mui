import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material'
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
// Modals
import CreateSundayEvent from './forms/CreateSundayEvent'
import UpdateSundayEvent from './forms/UpdateSundayEvent'
import SetIsDone from './forms/SetIsDone'
import Gallery from './Gallery/Gallery'
import Banner from './Banner'
import AskAgain from './AskAgain'
// Conf
import { db, storage } from '../../config/firebase'

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
  const [editEvent, setEditEvent] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [gallery, setGallery] = useState(null)
  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoad(true)
    const pathname = window.location.pathname
    const fetchData = () => {
      getDocs(collection(db, 'sundayEvents'))
        .then((snap) => {
          snap.forEach((doc) => {
            setRows((r) => [{ id: doc.id, ...doc.data() }, ...r])
          })
        })
        .then(() => {
          setLoad(false)
        })
        .catch((err) => {
          console.error(err)
          setError(err.message)
        })
    }
    if (pathname === '/admin/sundayevents') {
      fetchData()
    }
  }, [navigate])

  const deleteHandle = () => {
    setLoad(true)
    const docRef = doc(db, 'sundayEvents', deleteId)
    const event = rows.find((ev) => {
      return ev.id === deleteId
    })
    const bannerRef = ref(storage, event.banner)
    deleteObject(bannerRef)
      .then(() => {
        setSuccess('Banner deleted successfully!')
        if (event.gallery.length) {
          event.gallery.forEach((item) => {
            const itemRef = ref(storage, item.url)
            deleteObject(itemRef)
          })
          setSuccess('Gallery items deleted successfully!')
        }
      })
      .then(() => {
        deleteDoc(docRef)
      })
      .then(() => {
        setSuccess('Event deleted successfully!')
        setRows((rows) => rows.filter((row) => row.id !== deleteId))
        setDeleteModal(false)
        setLoad(false)
      })
      .catch((err) => {
        setError(err.message)
        console.error(err)
        setLoad(false)
      })
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
            setEditEvent(params.row)
          }}
          label='Edit'
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            setDeleteModal(true)
            setDeleteId(params.row)
          }}
          label='Delete'
        />,
        <GridActionsCellItem
          sx={params.row.isDone ? { display: 'none' } : {}}
          icon={<CheckCircleIcon />}
          onClick={() => {
            setIsDoneModal(true)
            setEditEvent(params.row)
          }}
          label='SetIsDone'
        />,
      ],
    },
  ]
  return (
    <>
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
          event={editEvent}
          setEvent={setEditEvent}
        />
        <CreateSundayEvent
          modal={createModal}
          setModal={setCreateModal}
          rows={rows}
          setRows={setRows}
          setTableLoad={setLoad}
        />
        <SetIsDone
          modal={isDoneModal}
          setModal={setIsDoneModal}
          event={editEvent}
          setSuccess={setSuccess}
          setError={setError}
          setRows={setRows}
          rows={rows}
        />
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
      <Snackbar
        open={success || error ? true : false}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(null)
          setError(null)
        }}
      >
        <Alert
          onClose={() => {
            setSuccess(null)
            setError(null)
          }}
          severity={success ? 'success' : 'error'}
          sx={{
            width: '100%',
            fontSize: '1.2rem',
          }}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </>
  )
}
export default SundayEvents
