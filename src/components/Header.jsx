import React, { useRef } from 'react'
import { Box, Typography } from '@mui/material'

const Header = ({ device }) => {
  const text = useRef()
  const video = useRef()

  window.addEventListener('scroll', () => {
    if (text.current && video.current && device === 'xl') {
      if (
        window.pageYOffset + window.innerHeight <=
        video.current.clientHeight + video.current.offsetTop
      ) {
        text.current.style.top =
          window.pageYOffset +
          window.innerHeight -
          (text.current.scrollHeight + 20) +
          'px'
      }
    }
  })

  return (
    <Box
      color='primary.contrastText'
      bgcolor='primary.main'
      position={device !== 'xl' ? 'relative' : 'unset'}
    >
      <video
        ref={video}
        autoPlay
        muted
        loop
        zindex={-1}
        style={{ height: '100%', width: '100%' }}
      >
        <source src={require('./../videos/bg.mp4').default} type='video/mp4' />
      </video>
      <Typography
        ref={text}
        variant={device === 'xs' ? 'h4' : device === 'sm' ? 'h2' : 'h1'}
        fontWeight={700}
        position='absolute'
        bottom='5%'
        left='5%'
        color='#fff'
        sx={{
          textShadow: '4px 4px 20px #000',
          fontFamily: 'Dancing Script',
        }}
        zIndex={1}
      >
        We Grow Together
      </Typography>
    </Box>
  )
}

export default Header
