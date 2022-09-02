import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  Button,
  Snackbar,
  Alert,
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
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ReactComponent as Empty } from '../../../images/empty.svg'
// Modals
import Banner from '../Banner'
import AddStaff from './AddStaff'
import UpdateStaff from './UpdateStaff'
// Conf
import { db, storage } from '../../../config/firebase'

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

const Staff = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState(null)
  const [staff, setStaff] = useState([])
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [member, setMember] = useState('')

  useEffect(() => {
    setLoad(true)
    const pathname = window.location.pathname
    const fetchStaff = async () => {
      getDocs(query(collection(db, 'staff'), orderBy('name', 'asc')))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setStaff((staff) => {
              const is = staff.filter((b) => b.id === doc.id)
              if (!is.length) {
                return [...staff, { id: doc.id, ...doc.data() }]
              } else {
                return staff
              }
            })
          })
        })
        .catch((err) => {
          setError(err.message)
          setLoad(false)
        })
    }

    if (pathname === '/admin/staff') {
      fetchStaff()
      setLoad(false)
    }
  }, [navigate])

  const deleteMember = async (member) => {
    setLoad(true)
    if (!member) {
      setLoad(false)
      console.log(member)
      return setError('Unknown error')
    }
    try {
      const bannerRef = ref(storage, member.banner)

      deleteObject(bannerRef).then(() => {
        setSuccess('Picture deleted successfully')
      })

      deleteDoc(doc(db, 'staff', member.id)).then(() => {
        setStaff(staff.filter((item) => item.id !== member.id))
        setSuccess('Member removed succesfully!')
        setLoad(false)
      })
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoad(false)
    }
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      minWidth: 160,
    },
    {
      field: 'subname',
      headerName: 'Subname',
      editable: true,
      minWidth: 160,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      valueOptions: ['admin', 'instructor', 'founder'],
      editable: true,
      minWidth: 160,
    },
    {
      field: 'description',
      headerName: 'Description',
      editable: true,
      minWidth: 160,
      flex: 1,
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
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setUpdateModal(true)
            setMember(params.row)
          }}
          label='See'
        />,
      ],
    },

    {
      field: 'actions',
      type: 'actions',
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            deleteMember(params.row)
          }}
          label='See'
        />,
      ],
    },
  ]

  const handleEdit = async (params) => {
    const { id, value, field } = params
    setLoad(true)
    const docRef = doc(db, 'staff', id)
    const change = {}

    change[field] = value

    try {
      await updateDoc(docRef, change)
      setSuccess('Succesfully updated!')
      setStaff(
        staff.map((member) => {
          return member.id === id ? { ...member, ...change } : member
        })
      )
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoad(false)
    }
  }
  return (
    <>
      <Box style={{ width: '100%' }}>
        <Stack>
          <Button variant='contained' onClick={() => setCreateModal(true)}>
            Add staff member
          </Button>
        </Stack>
        <Box style={{ height: 600, width: '100%' }}>
          <DataGrid
            columns={columns}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            loading={load}
            rows={staff}
            rowHeight={120}
            onCellEditCommit={handleEdit}
          />
        </Box>
        <Banner url={url} setUrl={setUrl} />
      </Box>
      <AddStaff
        modal={createModal}
        setModal={setCreateModal}
        rows={staff}
        setRows={setStaff}
        setTableLoad={setLoad}
        setSuccess={setSuccess}
        setError={setError}
      />
      <UpdateStaff
        modal={updateModal}
        setModal={setUpdateModal}
        member={member}
        setSuccess={setSuccess}
        setStaff={setStaff}
        staff={staff}
      />
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
export default Staff
