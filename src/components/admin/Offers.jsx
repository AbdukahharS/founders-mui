import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, LinearProgress, Typography } from '@mui/material'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
  GridOverlay,
} from '@mui/x-data-grid'
import { ReactComponent as Empty } from '../../images/empty.svg'
import { db } from '../../config/firebase'

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
          Nothing found
        </Typography>
      </Stack>
    </GridOverlay>
  )
}
const columns = [
  { field: 'id', headerName: 'ID', minWidth: 110 },
  {
    field: 'body',
    headerName: 'Body',
    minWidth: 150,
    flex: 1,
  },
  { field: 'phone', headerName: 'Phone' },
]

const Offers = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [type, setType] = useState('suggestion')
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const pathname = window.location.pathname
    const fetchData = () => {
      const colRef = collection(db, 'messages')
      getDocs(colRef)
        .then((snap) => {
          snap.forEach((docRef) => {
            const c = data.map((d) => {
              return d.id === docRef.id && d
            })
            if (!c.length) {
              setData((data) => [{ id: docRef.id, ...docRef.data() }, ...data])
            }
          })
        })
        .then(() => {
          setOffers(data.filter((offer) => offer.type === 'suggestion'))
        })
        .catch((err) => {
          alert(err.message)
          console.error(err)
        })
    }
    if (pathname === '/admin/offers') {
      fetchData()
    }
  }, [navigate, data])
  const handleClick = (newType) => {
    setType(newType)
    const newOffers = data.filter((offer) => offer.type === newType)
    setOffers(newOffers)
  }
  return (
    <Box style={{ height: 600, width: '100%' }}>
      <Stack direction='row' spacing={2} mb={2}>
        <Button
          disabled={type === 'suggestion'}
          sx={type === 'suggestion' ? {} : { bgcolor: 'secondary.main' }}
          onClick={() => handleClick('suggestion')}
        >
          Suggestions
        </Button>
        <Button
          disabled={type === 'objection'}
          sx={type === 'objection' ? {} : { bgcolor: 'secondary.main' }}
          onClick={() => handleClick('objection')}
        >
          Objestions
        </Button>
        <Button
          disabled={type === 'question'}
          sx={type === 'question' ? {} : { bgcolor: 'secondary.main' }}
          onClick={() => handleClick('question')}
        >
          Questions
        </Button>
      </Stack>
      <DataGrid
        columns={columns}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        loading={offers ? false : true}
        rows={offers}
        rowHeight={120}
      />
    </Box>
  )
}
export default Offers
