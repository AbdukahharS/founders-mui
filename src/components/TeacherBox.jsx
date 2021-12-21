import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const TeacherBox = ({
  teacher,
  setIsHover,
  setCurVideo,
  setIsVideoOpen,
  theme,
}) => {
  return (
    <Box
      width='90%'
      sx={{
        perspective: '1000px',
        height: '50vh',
        marginX: 'auto',
        py: '1rem',
      }}
      className='card'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
          borderRadius: '2rem',
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
          <Typography component='span' color='#ffdf33' variant='h4'>
            {teacher.name}
          </Typography>
        </Box>
        <Stack
          direction='column'
          alignItems='center'
          spacing={2}
          className='back-box'
          position='absolute'
          sx={
            theme.palette.mode === 'dark'
              ? {
                  backgroundColor: 'primary.main',
                  transform: 'rotateY(180deg)',
                }
              : {
                  backgroundImage: theme.palette.background,
                  transform: 'rotateY(180deg)',
                }
          }
        >
          <Typography variant='h5' className='desc' textAlign='center'>
            {teacher.description}
          </Typography>
          <Box
            className='btn'
            bgcolor='secondary.main'
            p='0.4rem 1rem'
            borderRadius='0.4rem'
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setCurVideo(teacher.video)
              setIsVideoOpen(true)
            }}
          >
            <Typography fontSize='1.4rem' color='primary'>
              Learn more
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default TeacherBox
