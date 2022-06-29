import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  Chip,
  Collapse,
  TextField,
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
import { ReactComponent as Empty } from '../../images/empty.svg'
// Modals
import Banner from './Banner'
import CreateBook from './forms/CreateBook'
import UpdateBook from './forms/UpdateBook'
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
const Library = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState(null)
  const [catForm, setCatForm] = useState(false)
  const [books, setBooks] = useState([])
  const [curCategory, setCurCategory] = useState('All')
  const [curBooks, setCurBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [actCat, setActCat] = useState(
    categories.filter((cat) => cat !== 'All')
  )
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [field, setField] = useState('')
  const [image, setImage] = useState('')
  const [id, setId] = useState('')
  useEffect(() => {
    if (curCategory === 'All') {
      setCurBooks(books)
    } else {
      setCurBooks(books.filter((book) => book.category === curCategory))
    }
  }, [curCategory, books])
  useEffect(() => {
    setLoad(true)
    const pathname = window.location.pathname
    const fetchBooks = async () => {
      const res = await fetch('https://founders.uz/backend/books', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const data = await res.json()
      setBooks(await data.body)
    }
    const fetchCategories = async () => {
      const res = await fetch('https://founders.uz/backend/categories', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const data = await res.json()
      data.body.unshift('All')
      setCategories(data.body)
      setActCat(data.body.filter((cat) => cat !== 'All'))
    }
    if (pathname === '/admin/library') {
      fetchBooks()
      fetchCategories()
      setLoad(false)
    }
  }, [navigate])
  const deleteBook = async (id) => {
    setLoad(true)
    const res = await fetch(`https://founders.uz/backend/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    try {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      setBooks(books.filter((book) => book.id !== id))
      setSuccess(data.message)
      setLoad(false)
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoad(false)
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110 },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      type: 'singleSelect',
      valueOptions: actCat,
      editable: true,
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
            setField('banner')
            setImage(params.row.banner)
            setId(params.row.id)
          }}
          label='See'
        />,
      ],
    },
    {
      field: 'file',
      headerName: 'File',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <a href={params.row.file} target='_blank' rel='noreferrer'>
              <VisibilityIcon />
            </a>
          }
          label='See'
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setUpdateModal(true)
            setField('file')
            setImage(params.row.file)
            setId(params.row.id)
          }}
          label='See'
        />,
      ],
    },
    {
      field: 'audio',
      headerName: 'Audio',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <a href={params.row.file} target='_blank' rel='noreferrer'>
              <VisibilityIcon
                sx={params.row.audio ? {} : { display: 'none' }}
              />
            </a>
          }
          label='See'
        />,
        <GridActionsCellItem
          icon={<EditIcon sx={params.row.audio ? {} : { display: 'none' }} />}
          onClick={() => {
            setUrl(params.row.banner)
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
            deleteBook(params.row.id)
          }}
          label='See'
        />,
      ],
    },
  ]
  const handleDelete = async (category) => {
    const res = await fetch('https://founders.uz/backend/categories', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ name: category }),
    })
    try {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      } else {
        const newCategories = categories.filter((cat) => cat !== category)
        setCategories(newCategories)
        setActCat(newCategories.filter((cat) => cat !== 'All'))
        setSuccess(data.message)
      }
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }
  const addCategory = async () => {
    const res = await fetch('https://founders.uz/backend/categories', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ name }),
    })
    try {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      } else {
        categories.push(name)
        setCategories(categories)
        setActCat(categories.filter((cat) => cat !== 'All'))
        setSuccess(data.message)
        setName('')
        setCatForm(false)
      }
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }
  const handleEdit = async (params) => {
    const { id, value, field } = params
    setLoad(true)
    const body = new FormData()
    body.append(field, value)
    body.append('token', localStorage.getItem('token'))
    const res = await fetch(`https://founders.uz/backend/books/${id}`, {
      headers: { 'x-access-token': localStorage.getItem('token') },
      method: 'PUT',
      body: body,
    })
    try {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      setSuccess(data.message)
      setBooks(
        books.map((book) => {
          return book.id === id ? data.body : book
        })
      )
      setUpdateModal(false)
      setLoad(false)
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoad(false)
    }
  }
  return (
    <>
      <Box style={{ width: '100%' }}>
        <Stack
          sx={{ justifyContent: 'start', alignItems: 'center', mb: '1rem' }}
          direction='row'
        >
          <Collapse
            in={!catForm}
            orientation='horizontal'
            sx={{ overflowX: 'auto', pb: 1 }}
          >
            <Stack
              sx={{
                justifyContent: 'start',
                alignItems: 'center',
              }}
              direction='row'
              spacing={2}
            >
              {categories.map((category, i) => (
                <Chip
                  key={i}
                  label={category}
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setCurCategory(category)}
                  onDelete={
                    category !== 'All' ? () => handleDelete(category) : null
                  }
                  variant={curCategory === category ? 'filled' : 'outlined'}
                />
              ))}
              <Chip
                label='Add category'
                sx={{ fontSize: '1rem' }}
                onClick={() => setCatForm(true)}
                variant='filled'
              />
            </Stack>
          </Collapse>
          <Collapse in={catForm}>
            <Stack
              sx={{ justifyContent: 'start', alignItems: 'center' }}
              direction='row'
              spacing={2}
            >
              <TextField
                label='Category name'
                variant='outlined'
                color='secondary'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button variant='contained' onClick={addCategory}>
                Submit
              </Button>
            </Stack>
          </Collapse>
        </Stack>
        <Stack>
          <Button variant='contained' onClick={() => setCreateModal(true)}>
            Create Book
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
            rows={curBooks}
            rowHeight={120}
            onCellEditCommit={handleEdit}
          />
        </Box>
        <Banner url={url} setUrl={setUrl} />
      </Box>
      <CreateBook
        modal={createModal}
        setModal={setCreateModal}
        rows={curBooks}
        setRows={setCurBooks}
        setTableLoad={setLoad}
        setSuccess={setSuccess}
        setError={setError}
        categories={actCat}
      />
      <UpdateBook
        modal={updateModal}
        setModal={setUpdateModal}
        load={load}
        field={field}
        image={image}
        id={id}
        handleEdit={handleEdit}
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
export default Library
