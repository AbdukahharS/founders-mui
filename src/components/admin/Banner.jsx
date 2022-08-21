import { useState, useEffect } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { Modal } from '@mui/material'
import { storage } from '../../config/firebase'

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
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (url && url.length) {
      const itemRef = ref(storage, url)
      getDownloadURL(itemRef)
        .then((url) => {
          setSrc(url)
        })
        .catch((err) => console.error(err))
    }
  }, [url])

  return (
    <Modal open={url ? true : false} onClose={() => setUrl(null)}>
      <img style={style} src={src} alt='' />
    </Modal>
  )
}
export default Banner
