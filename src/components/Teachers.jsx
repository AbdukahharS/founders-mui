import React, { useState } from 'react'
import TeacherBox from './TeacherBox'
import { Box, Container, Typography } from '@mui/material'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

const teachers = [
  {
    name: 'John Doe',
    description: 'Instructor of IELTS 7+ course and 8.5 score holder',
    banner: 'teacher1.png',
    video: 'teacher1.mp4',
  },
  {
    name: 'Edward Snowden',
    description: 'Instructor of General English course and 8.0 holder',
    banner: 'teacher2.png',
    video: 'teacher2.mp4',
  },
  {
    name: 'Jane Doe',
    description: 'Instructor of IELTS speed-up course and 8.0 holder',
    banner: 'teacher3.png',
    video: 'teacher3.mp4',
  },
]

const Teachers = ({ setCurVideo, setIsVideoOpen, theme }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <Box
      id='instructors'
      bgcolor='info.light'
      color='info.contrastText'
      pb={8}
      position='relative'
    >
      <Container>
        <Typography py={4} variant='h2' color='secondary' fontWeight={500}>
          Our Instructors
        </Typography>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={!isHover}
          keyBoardControl={true}
          autoPlaySpeed={2000}
        >
          {teachers.map((teacher, ind) => (
            <TeacherBox
              setCurVideo={setCurVideo}
              setIsVideoOpen={setIsVideoOpen}
              setIsHover={setIsHover}
              teacher={teacher}
              key={ind}
              theme={theme}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  )
}

export default Teachers
