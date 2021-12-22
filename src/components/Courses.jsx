import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { Button, Container, Grid, Typography, Box, Stack } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const courses = [
  {
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.gif',
    duration: '3 months',
    requirement: 'Elementary',
    price: '400 000',
  },
  {
    name: 'IELTS up',
    description:
      'Aliquam erat volutpat. Nullam molestie magna interdum mattis posuere. Ut porttitor pellentesque elit eget auctor.',
    banner: 'ielts-up.gif',
    duration: '3 months',
    requirement: 'Intermediate',
    price: '600 000',
  },
  {
    name: 'IELTS turbo',
    description:
      'Fusce auctor magna quis dolor sodales porttitor. Quisque a pellentesque ex.',
    banner: 'ielts-turbo.gif',
    duration: '2 months',
    requirement: 'Pre-intermediate',
    price: '450 000',
  },
]

const Courses = ({
  setCurrentCourse,
  setOpenModal,
  isMobile,
  isTablet,
  language,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleCourses = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <Box id='courses' bgcolor='info.light' color='info.contrastText' pb={8}>
      <Container>
        <Typography py={4} variant='h2' color='secondary' fontWeight={700}>
          {language.courses.heading}
        </Typography>
        <Grid m='auto' container spacing={isMobile ? 0 : isTablet ? 0 : 4}>
          {courses.map((course, ind) =>
            ind <= (isMobile ? 1 : 2) ? (
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
        {courses.length > (isMobile ? 2 : 3) && (
          <Stack alignItems='center' justifyContent='center'>
            <Button variant='contained' onClick={(e) => toggleCourses(e)}>
              <Typography variant='span' fontSize='1.4rem'>
                {isExpanded
                  ? language.courses.btn.collapse
                  : language.courses.btn.expand}
              </Typography>
              {isExpanded ? (
                <KeyboardArrowUpIcon fontSize='large' />
              ) : (
                <KeyboardArrowDownIcon fontSize='large' />
              )}
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default Courses
