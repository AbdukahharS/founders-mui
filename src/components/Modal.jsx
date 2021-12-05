import React from 'react'
// import '../css/modal.css'

import { Modal as ModalBox, Box, Stack, Typography } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import DateRangeIcon from '@mui/icons-material/DateRange'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'info.light',
  color: 'primary.contrastText',
  p: 4,
}

const Modal = ({ openModal, setOpenModal, currentCourse }) => {
  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <ModalBox open={openModal} onClose={() => closeModal()}>
      <Box sx={style}>
        <Stack direction='row' spacing={4}>
          <img
            src={require(`../images/${currentCourse.banner}`).default}
            alt='Banner of the course'
            width='50%'
          />
          <Box>
            <Typography variant='h3' component='h2' color='secondary'>
              {currentCourse.name}
            </Typography>
            <Stack direction='row' alignItems='center' spacing={0.6}>
              <DateRangeIcon fontSize='large' />
              <Typography fontSize='1.2rem'>
                Course duration: {currentCourse.duration}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={0.6}>
              <KeyboardArrowUpIcon fontSize='large' />
              <Typography fontSize='1.2rem'>
                Minimum requirement: {currentCourse.requirement}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={0.6}>
              <MonetizationOnIcon fontSize='large' />
              <Typography fontSize='1.2rem'>
                Price: {currentCourse.price} sum/month
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={0.6}>
              <DescriptionIcon fontSize='large' />
              <Typography fontSize='1.2rem'>
                {currentCourse.description}
              </Typography>
            </Stack>
            <Typography>Enroll:</Typography>
            <div className='tels'>
              <i className='fa-solid fa-phone'></i>
              <div>
                <a href='tel:+998712055333'>+998 71 205 53 33</a>
                <a href='tel:+998712050333'>+998 71 205 03 33</a>
              </div>
            </div>
          </Box>
        </Stack>
      </Box>
    </ModalBox>
  )
}

export default Modal
