import React from 'react'
import { Box, Typography } from '@mui/material'

const Header = ({ device }) => {
  return (
    <Box
      color='primary.contrastText'
      position={device === 'xl' ? 'unset' : 'relative'}
      bgcolor='primary.main'
    >
      <video
        autoPlay
        muted
        loop
        zindex={-1}
        style={{ height: '100%', width: '100%' }}
      >
        <source src={require('./../videos/bg.mp4').default} type='video/mp4' />
      </video>
      <Typography
        variant={device === 'xs' ? 'h4' : device === 'sm' ? 'h2' : 'h1'}
        fontWeight={700}
        position='absolute'
        bottom={device === 'lg' ? '10%' : device === 'md' ? '8%' : '5%'}
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
