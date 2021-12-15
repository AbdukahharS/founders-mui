import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Collapse,
  Stack,
} from '@mui/material'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

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
    <Grid item lg={4} sm={5} xs={9} mx='auto' mb={2}>
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
              <Stack
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'info.main',
                  width: 'fit-content',
                  p: '0 0.8rem',
                  my: '1rem',
                  mx: 'auto',
                  borderRadius: '0.2rem',
                }}
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <Typography fontSize='1.4rem'>Learn more</Typography>
                <ArrowRightAltIcon />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Collapse>
    </Grid>
  )
}

export default CourseCard
