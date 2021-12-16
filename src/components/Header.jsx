import React from 'react'
// import banner from '../images/header.png'
import { Box, Typography } from '@mui/material'

const Header = ({ isMobile, isTablet }) => {
  return (
    <Box
      color='primary.contrastText'
      position='relative'
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
        variant={isMobile ? 'h4' : isTablet ? 'h2' : 'h1'}
        fontWeight={700}
        position='absolute'
        bottom='13%'
        left='5%'
        color='#fff'
        sx={{
          // transform: 'translate(-50%, -50%)',
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
