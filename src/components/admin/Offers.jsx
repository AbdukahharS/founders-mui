import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, LinearProgress } from '@mui/material'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  gridClasses,
  GridOverlay,
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

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 110 },
  {
    field: 'body',
    headerName: 'Body',
    minWidth: 150,
    flex: 1,
  },
]

const Offers = () => {
  const [data, setData] = useState([])
  const [type, setType] = useState('suggestion')
  const [offers, setOffers] = useState([])

  useEffect(() => {
    fetch('https://founders-backend.shakhzodbekkakh.repl.co/offers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const newData = await res.json()
          setData(newData)
          const newOffers = await newData.filter(
            (offer) => offer.type === 'suggestion'
          )
          setOffers(newOffers)
        }
      })
      .catch((err) => console.error(err))
  }, [])

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
          sx={
            type === 'suggestion'
              ? { bgcolor: '#333', color: '#aaa', cursor: 'default' }
              : { bgcolor: 'secondary.main' }
          }
          onClick={() => handleClick('suggestion')}
        >
          Suggestions
        </Button>
        <Button
          disabled={type === 'objection'}
          sx={
            type === 'objection'
              ? { bgcolor: '#333', color: '#aaa', cursor: 'default' }
              : { bgcolor: 'secondary.main' }
          }
          onClick={() => handleClick('objection')}
        >
          Objestions
        </Button>
        <Button
          disabled={type === 'question'}
          sx={
            type === 'question'
              ? { bgcolor: '#333', color: '#aaa', cursor: 'default' }
              : { bgcolor: 'secondary.main' }
          }
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
        }}
        loading={offers ? false : true}
        rows={offers}
        rowHeight={120}
      />
    </Box>
  )
}

export default Offers
