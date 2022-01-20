import React, { useState } from 'react'
import TeacherBox from './TeacherBox'
import { Box, Container, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import stuff from '../db/stuff'
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

const Teachers = ({ theme, language }) => {
  const [isHover, setIsHover] = useState(false)
  const [role, setRole] = useState('admin')

  return (
    <Box
      id='instructors'
      bgcolor='info.light'
      color='info.contrastText'
      pb={8}
      position='relative'
    >
      <Container>
        <Typography py={4} fontSize='3rem' color='secondary' fontWeight={700}>
          {language.instructors.heading[role]}
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
          afterChange={(previousSlide, { currentSlide, onMove }) => {
            setRole(
              currentSlide === 4 || currentSlide === 5 ? 'admin' : 'instructor'
            )
          }}
        >
          {stuff.map((teacher, ind) => (
            <TeacherBox
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
