import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { Button, Container, Grid, Typography, Box, Stack } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// DB
import courses from '../../../db/courses'

const Courses = ({ setCurrentCourse, setOpenModal, device, language }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleCourses = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box id='courses' bgcolor={'light.main'} color='light.contrastText' pb={8}>
      <Container>
        <Typography py={4} fontSize='3rem' color='secondary' fontWeight={700}>
          {language.courses.heading}
        </Typography>
        <Grid
          m='auto'
          container
          spacing={
            device === 'xs' || device === 'sm' ? 0 : device === 'md' ? 2 : 4
          }
        >
          {courses.map((course, ind) =>
            ind <= (device === 'xs' || device === 'sm' ? 1 : 2) ? (
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
        {courses.length > (device === 'xs' || device === 'sm' ? 2 : 3) && (
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
