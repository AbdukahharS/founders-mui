import React from 'react'
import { Box, Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
}

const InstructorModal = ({ isVideoOpen, setIsVideoOpen, curVideo }) => {
  return (
    <Modal open={isVideoOpen} onClose={() => setIsVideoOpen(false)}>
      <Box sx={style}>
        <video autoPlay loop controls style={{ height: '100%', width: '100%' }}>
          <source
            src={require(`./../videos/${curVideo}`).default}
            type='video/mp4'
          />
        </video>
      </Box>
    </Modal>
  )
}

export default InstructorModal
