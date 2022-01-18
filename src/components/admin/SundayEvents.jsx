import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridActionsCellItem,
} from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateSundayEvent from './forms/CreateSundayEvent'
import UpdateSundayEvent from './forms/UpdateSundayEvent'

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
  const [editID, setEditID] = useState(null)
  const [rows, setRows] = useState([])

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
      })
      .catch((err) => console.error(err))
  })

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
    },
    {
      field: 'size',
      headerName: 'Intended Size',
      type: 'date',
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
        rows={rows}
        columns={columns}
        rowHeight={120}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <UpdateSundayEvent
        modal={updateModal}
        setModal={setUpdateModal}
        id={editID}
        setId={setEditID}
      />
      <CreateSundayEvent modal={createModal} setModal={setCreateModal} />
    </Box>
  )
}

export default SundayEvents
