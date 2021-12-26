import { Box, Typography, Grid, Collapse, Stack } from '@mui/material'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

const CourseCard = ({
  setOpenModal,
  setCurrentCourse,
  course,
  isExpanded,
  extra,
  // lang,
}) => {
  const openModal = () => {
    setOpenModal(true)
    setCurrentCourse(course)
  }
  let lan = localStorage.getItem('language')

  const [lang, setLang] = React.useState(localStorage.getItem('language'))
  React.useEffect(() => {
    setLang(localStorage.getItem('language'))
  }, [lan])

  return (
    <Grid item lg={4} sm={5} xs={9} mx='auto' mb={2}>
      <Collapse in={extra ? isExpanded : true}>
        <Box
          sx={{
            bgcolor: 'info.main',
            color: 'primary.contrastText',
            borderRadius: '0.8rem',
          }}
        >
          <video
            width='100%'
            autoPlay
            muted
            loop
            style={{
              borderTopRightRadius: '0.8rem',
              borderTopLeftRadius: '0.8rem',
            }}
          >
            <source
              src={require(`../videos/${course.banner}`).default}
              type='video/webm'
            />
          </video>
          <Box sx={{ py: 1, px: 2 }}>
            <Typography
              variant='h4'
              color='secondary.main'
              pb={1}
              fontWeight={600}
            >
              {course.name}
            </Typography>
            <Typography variant='p' fontSize='1.2rem'>
              {course.description[lang] && course.description[lang]}
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
                cursor: 'pointer',
              }}
              onClick={() => openModal()}
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <Typography fontSize='1.4rem'>Learn more</Typography>
              <ArrowRightAltIcon />
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Grid>
  )
}

export default CourseCard
