import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { lightTheme } from '../muiConfig'
const TeacherBox = ({ teacher }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{ perspective: '1000px', height: '50vh' }}
      className='card'
    >
      <Box
        className='inner-box'
        position='relative'
        sx={{
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '1rem',
        }}
      >
        <Box
          className='front-box'
          key='ind'
          sx={{
            background:
              'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)), url(' +
              require(`../images/${teacher.banner}`).default +
              ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Typography color='#ffdf33' variant='h4'>
            {teacher.name}
          </Typography>
        </Box>
        <Stack
          direction='column'
          alignItems='center'
          spacing={2}
          className='back-box'
          position='absolute'
          sx={{
            transform: 'rotateY(180deg)',
            bgcolor: 'primary.main',
          }}
        >
          <Typography variant='h5' textAlign='center'>
            {teacher.description}
          </Typography>
          <Box bgcolor='secondary.main' p='0.4rem 1rem' borderRadius='0.4rem'>
            <Link to='/' style={{ fontSize: '1.4rem' }}>
              <Typography fontSize='1.4rem' color='primary'>
                Learn more
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Grid>
  )
}

export default TeacherBox
