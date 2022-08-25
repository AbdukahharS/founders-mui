import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
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

const Library = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState(null)
  const [catForm, setCatForm] = useState(false)
  const [books, setBooks] = useState([])
  const [curCategory, setCurCategory] = useState({ name: 'All' })
  const [curBooks, setCurBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [field, setField] = useState('')
  const [image, setImage] = useState('')
  const [book, setBook] = useState('')

  useEffect(() => {
    if (curCategory.name === 'All') {
      setCurBooks(books)
    } else {
      setCurBooks(books.filter((book) => book.category.id === curCategory.id))
    }
  }, [curCategory, books])

  useEffect(() => {
    setLoad(true)
    const pathname = window.location.pathname
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'library'), orderBy('name', 'asc'))
      )
      querySnapshot.forEach((doc) => {
        setBooks((books) => {
          const is = books.filter((b) => b.id === doc.id)
          if (!is.length) {
            return [...books, { id: doc.id, ...doc.data() }]
          } else {
            return books
          }
        })
      })
    }
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'categories'), orderBy('name', 'asc'))
      )
      querySnapshot.forEach((doc) => {
        setCategories((categories) => {
          const is = categories.filter((c) => c.id === doc.id)
          if (!is.length) {
            return [...categories, { id: doc.id, ...doc.data() }]
          } else {
            return categories
          }
        })
      })
      setCategories((c) => [{ name: 'All' }, ...c])
    }
    if (pathname === '/admin/library') {
      fetchBooks()
      fetchCategories()
      setLoad(false)
    }
  }, [navigate])

  const deleteBook = async (id) => {
    setLoad(true)
    let book = books.filter((b) => b.id === id)
    book = book[0]
    if (!book) {
      setLoad(false)
      console.log(id)
      return setError('Unknown error')
    }
    try {
      const bannerRef = ref(storage, book.banner)
      const fileRef = ref(storage, book.file)
      const audioRef = book.audio ? ref(storage, book.audio) : null

      deleteObject(bannerRef).then(() => {
        setSuccess('Banner deleted successfully')
      })
      deleteObject(fileRef).then(() => {
        setSuccess('File deleted successfully')
      })
      if (audioRef) {
        deleteObject(audioRef).then(() => {
          setSuccess('Audio deleted successfully')
        })
      }
      await deleteDoc(doc(db, 'library', id))
      setBooks(books.filter((book) => book.id !== id))
      setSuccess('Book removed succesfully!')
      setLoad(false)
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoad(false)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 200 },
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
      valueOptions: categories.map((c) => c.name !== 'All' && c.name),
      editable: true,
      valueGetter: (params) => {
        const cat =
          categories &&
          categories.filter((c) => c.id === params.row.category.id)
        return cat.length && cat[0].name
      },
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
            setBook(params.row)
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
            setBook(params.row)
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
    const catRef = doc(db, 'categories', category.id)
    try {
      books.forEach(async (b) => {
        if (b.category.id === category.id) {
          const bookRef = doc(db, 'library', b.id)
          const newCategory = categories[categories.length - 2]
          const newCatRef = doc(db, 'categories', newCategory.id)
          await updateDoc(bookRef, {
            category: newCatRef,
          })
          b.category = newCategory
        }
      })
      await deleteDoc(catRef)
      setCategories((categories) =>
        categories.filter((c) => c.id !== category.id)
      )
      setSuccess('Succesfully deleted')
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }
  const addCategory = async () => {
    try {
      const snap = await addDoc(collection(db, 'categories'), { name })
      const category = { id: snap.id, name }
      setCategories([...categories, category])
      setSuccess('Successfilly added!')
      setName('')
      setCatForm(false)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  const handleEdit = async (params) => {
    const { id, value, field } = params
    setLoad(true)
    const docRef = doc(db, 'library', id)
    const change = {}
    if (field === 'category') {
      const cat = categories.filter((c) => c.name === value)
      const catRef = doc(db, 'categories', cat[0].id)
      change[field] = catRef
    } else {
      change[field] = value
    }

    try {
      await updateDoc(docRef, change)
      setSuccess('Succesfully updated!')
      setBooks(
        books.map((book) => {
          return book.id === id ? { ...book, ...change } : book
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
              {categories.length &&
                categories.map((category, i) => (
                  <Chip
                    key={i}
                    label={category.name}
                    sx={{ fontSize: '1rem' }}
                    onClick={() => setCurCategory(category)}
                    onDelete={
                      category.name !== 'All'
                        ? () => handleDelete(category)
                        : null
                    }
                    variant={
                      curCategory.name === category.name ? 'filled' : 'outlined'
                    }
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
        categories={categories.filter((c) => c.name !== 'All')}
      />
      <UpdateBook
        modal={updateModal}
        setModal={setUpdateModal}
        load={load}
        field={field}
        image={image}
        book={book}
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
