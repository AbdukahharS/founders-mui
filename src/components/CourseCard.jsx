import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Collapse,
} from '@mui/material'
import React from 'react'

const CourseCard = ({
  setOpenModal,
  setCurrentCourse,
  course,
  isExpanded,
  extra,
}) => {
  const openModal = () => {
    setOpenModal(true)
    setCurrentCourse(course)
    console.log('true')
  }
  return (
    <Grid item lg={4} sm={6} xs={12} mb={2}>
      <Collapse in={extra ? isExpanded : true}>
        <Card sx={{ bgcolor: 'info.main', color: 'primary.contrastText' }}>
          <CardActionArea onClick={() => openModal()}>
            <CardMedia
              component='img'
              image={require(`../images/${course.banner}`).default}
            />
            <CardContent className='card-body'>
              <Typography variant='h4' color='secondary.main' pb={1}>
                {course.name}
              </Typography>
              <Typography variant='p' fontSize='1.2rem'>
                {course.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Collapse>
    </Grid>
  )
}

export default CourseCard
