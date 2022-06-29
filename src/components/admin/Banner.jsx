import React from 'react'
import { Modal } from '@mui/material'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '95vw',
  maxHeight: '95vh',
  display: 'block',
}
const Banner = ({ url, setUrl }) => {
  return (
    <Modal open={url ? true : false} onClose={() => setUrl(null)}>
      <img style={style} src={url} alt='' />
    </Modal>
  )
}
export default Banner
