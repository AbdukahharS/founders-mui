import React from 'react'
// import '../css/teachers.css'
import TeacherBox from './TeacherBox'
import { Box, Container, Grid, Typography } from '@mui/material'

const teachers = [
  {
    name: 'John Doe',
    description: 'Instructor of IELTS 7+ course and 8.5 score holder',
    banner: 'teacher1.png',
  },
  {
    name: 'Edward Snowden',
    description: 'Instructor of General English course and 8.0 holder',
    banner: 'teacher2.png',
  },
  {
    name: 'Jane Doe',
    description: 'Instructor of IELTS speed-up course and 8.0 holder',
    banner: 'teacher3.png',
  },
]

const Teachers = () => {
  return (
    <Box id='instructors' bgcolor='info.light' color='info.contrastText' pb={8}>
      <Container>
        <Typography py={4} variant='h2' color='secondary' fontWeight={500}>
          Our Instructors
        </Typography>
        <Grid container spacing={6}>
          {teachers.map((teacher, ind) => (
            <TeacherBox teacher={teacher} key={ind} />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Teachers
