import React, { useState } from 'react'
import CourseCard from './CourseCard'
// import '../css/courses.css'
import { Button, Container, Grid, Typography, Box, Stack } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const courses = [
  {
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.png',
    duration: '3 months',
    requirement: 'Elementary',
    price: '400 000',
  },
  {
    name: 'IELTS speed-up',
    description:
      'Fusce auctor magna quis dolor sodales porttitor. Quisque a pellentesque ex.',
    banner: 'speed-up.png',
    duration: '2 months',
    requirement: 'Pre-intermediate',
    price: '450 000',
  },
  {
    name: 'IELTS 7+',
    description:
      'Aliquam erat volutpat. Nullam molestie magna interdum mattis posuere. Ut porttitor pellentesque elit eget auctor.',
    banner: '7+.png',
    duration: '3 months',
    requirement: 'Intermediate',
    price: '600 000',
  },
  {
    name: 'IELTS 7+',
    description:
      'Aliquam erat volutpat. Nullam molestie magna interdum mattis posuere. Ut porttitor pellentesque elit eget auctor.',
    banner: '7+.png',
    duration: '3 months',
    requirement: 'Pre-intermediate',
  },
  {
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.png',
    duration: '3 months',
    requirement: 'Elementary',
  },
  {
    name: 'IELTS speed-up',
    description:
      'Fusce auctor magna quis dolor sodales porttitor. Quisque a pellentesque ex.',
    banner: 'speed-up.png',
    duration: '2 months',
    requirement: 'Elementary',
  },
]

const Courses = ({ setCurrentCourse, setOpenModal }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleCourses = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <Box id='courses' bgcolor='info.light' color='info.contrastText' pb={8}>
      <Container>
        <Typography py={4} variant='h2' color='secondary' fontWeight={500}>
          Our Courses
        </Typography>
        <Grid m='auto' container spacing={6} className='container'>
          {courses.map((course, ind) =>
            ind <= 2 ? (
              <CourseCard
                setOpenModal={setOpenModal}
                setCurrentCourse={setCurrentCourse}
                course={course}
                key={ind}
              />
            ) : (
              <CourseCard
                setOpenModal={setOpenModal}
                setCurrentCourse={setCurrentCourse}
                course={course}
                key={ind}
                isExpanded={isExpanded}
                extra={true}
              />
            )
          )}
        </Grid>
        <Stack alignItems='center' justifyContent='center'>
          <Button variant='contained' onClick={(e) => toggleCourses(e)}>
            <Typography variant='span'>
              {isExpanded ? 'Collapse' : 'See all courses'}
            </Typography>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Courses
