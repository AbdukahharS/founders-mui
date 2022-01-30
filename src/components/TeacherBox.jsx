import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const TeacherBox = ({ teacher, setIsHover, theme, i, role }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: '1.6rem',
          ml: 1,
          color:
            i === 0 || i === 3 || i === 8
              ? 'primary.contrastText'
              : 'light.main',
        }}
      >
        {role}
      </Typography>
      <Box
        width='90%'
        sx={{
          perspective: '1000px',
          height: '50vh',
          minHeight: '30rem',
          marginX: 'auto',
          py: '1rem',
          mb: '1.6rem',
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
            boxShadow: '-2px 2px 4px rgba(0,0,0,0.5)',
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
            <Stack direction='column' align='center'>
              <Typography color='#ffdf33' fontSize='2rem'>
                {teacher.name}
              </Typography>
              <Typography color='#ffdf33' fontSize='1.1rem'>
                {teacher.subname}
              </Typography>
            </Stack>
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
            <Typography
              variant='h5'
              className='desc'
              color='light.contrastText'
              textAlign='center'
            >
              {teacher.description}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default TeacherBox
