import React from 'react'
import {
  Modal as ModalBox,
  Box,
  Stack,
  Typography,
  Link,
  Grow,
  Button,
} from '@mui/material'
// MUI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import DateRangeIcon from '@mui/icons-material/DateRange'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import LocalPhone from '@mui/icons-material/LocalPhone'
import CancelIcon from '@mui/icons-material/Cancel'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const mStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  bgcolor: 'info.light',
  color: 'primary.contrastText',
  overflowY: 'auto',
}

const notMStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'info.light',
  color: 'primary.contrastText',
  width: '90vw',
  maxWidth: '1080px',
  p: 4,
  overflowY: 'auto',
}

const CourseModal = ({
  openModal,
  setOpenModal,
  currentCourse,
  isMobile,
  isTablet,
  lang,
}) => {
  const closeModal = () => {
    setOpenModal(false)
  }

  const [courseNum, setCourseNum] = React.useState(0)

  return (
    <ModalBox open={openModal} onClose={() => closeModal()}>
      <Box
        sx={isMobile ? mStyle : notMStyle}
        width={isTablet ? '90vw' : 'unset'}
      >
        {currentCourse.type === 'course' ? (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={4}
            height='100%'
          >
            <video
              style={!isMobile ? { width: '30rem' } : { width: '100vw' }}
              autoPlay
              muted
              loop
            >
              <source
                src={require(`../videos/${currentCourse.banner}`).default}
                type='video/webm'
              />
            </video>
            <Box sx={isMobile ? { px: 2 } : {}}>
              <Typography variant='h3' component='h2' color='secondary'>
                {currentCourse.name}
              </Typography>
              <Stack py={1} direction='row' alignItems='center' spacing={0.6}>
                <DescriptionIcon fontSize='large' />
                <Typography fontSize='1.2rem'>
                  {currentCourse.description[lang]}
                </Typography>
              </Stack>
              <Stack pb={1} direction='row' alignItems='center' spacing={0.6}>
                <DateRangeIcon fontSize='large' />
                <Typography fontSize='1.2rem'>
                  Course duration: {currentCourse.duration}
                </Typography>
              </Stack>
              <Stack pb={1} direction='row' alignItems='center' spacing={0.6}>
                <KeyboardArrowUpIcon fontSize='large' />
                <Typography fontSize='1.2rem'>
                  Minimum requirement: {currentCourse.requirement}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={0.6}>
                <MonetizationOnIcon fontSize='large' />
                <Typography fontSize='1.2rem'>
                  Price: {currentCourse.price} sum/month
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' pt={1} spacing={0.6}>
                <LocalPhone fontSize='large' />
                <Typography fontSize='1.2rem'>Enroll:</Typography>
              </Stack>

              <Stack direction='row' justifyContent='space-evenly'>
                <Link
                  underline='hover'
                  color='inherit'
                  fontSize='1.3rem'
                  href='tel:+998712055333'
                >
                  +998 71 205 53 33
                </Link>
                <Link
                  underline='hover'
                  fontSize='1.3rem'
                  color='inherit'
                  href='tel:+998712050333'
                >
                  +998 71 205 03 33
                </Link>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack
            direction={isTablet ? 'column' : 'row'}
            spacing={isMobile ? 0 : 3}
            sx={{ overflowY: 'auto' }}
          >
            {currentCourse.items &&
              currentCourse.items.map((item, i) => (
                <Grow key={i} in={(!isMobile || courseNum === i) && true}>
                  <Stack
                    direction={isTablet ? 'row' : 'column'}
                    spacing={4}
                    height={isTablet ? '50%' : '100%'}
                    width={isMobile ? '100vw' : 'unset'}
                    position={isMobile ? 'absolute' : 'unset'}
                  >
                    <video
                      style={
                        !isMobile
                          ? { minWidth: '13rem', width: '65%', margin: 'auto' }
                          : { width: '100vw' }
                      }
                      autoPlay
                      muted
                      loop
                    >
                      <source
                        src={require(`../videos/${item.banner}`).default}
                        type='video/webm'
                      />
                    </video>
                    <Box sx={isMobile ? { px: 2 } : {}}>
                      <Typography fontSize='2.2rem' color='secondary' key={i}>
                        {item.name}
                      </Typography>
                      <Stack
                        py={1}
                        direction='row'
                        alignItems='center'
                        spacing={0.6}
                      >
                        <DescriptionIcon fontSize='large' />
                        <Typography fontSize='1.2rem'>
                          {item.description[lang]}
                        </Typography>
                      </Stack>
                      <Stack
                        pb={1}
                        direction='row'
                        alignItems='center'
                        spacing={0.6}
                      >
                        <DateRangeIcon fontSize='large' />
                        <Typography fontSize='1.2rem'>
                          Course duration: {item.duration}
                        </Typography>
                      </Stack>
                      <Stack
                        pb={1}
                        direction='row'
                        alignItems='center'
                        spacing={0.6}
                      >
                        <KeyboardArrowUpIcon fontSize='large' />
                        <Typography fontSize='1.2rem'>
                          Minimum requirement: {item.requirement}
                        </Typography>
                      </Stack>
                      <Stack direction='row' alignItems='center' spacing={0.6}>
                        <MonetizationOnIcon fontSize='large' />
                        <Typography fontSize='1.2rem'>
                          Price: {item.price} sum/month
                        </Typography>
                      </Stack>
                      <Stack
                        direction='row'
                        alignItems='center'
                        pt={1}
                        spacing={0.6}
                      >
                        <LocalPhone fontSize='large' />
                        <Typography fontSize='1.2rem'>Enroll:</Typography>
                      </Stack>

                      <Stack direction='row' justifyContent='space-evenly'>
                        <Link
                          underline='hover'
                          color='inherit'
                          fontSize='1.3rem'
                          href='tel:+998712055333'
                        >
                          +998 71 205 53 33
                        </Link>
                        <Link
                          underline='hover'
                          fontSize='1.3rem'
                          color='inherit'
                          href='tel:+998712050333'
                        >
                          +998 71 205 03 33
                        </Link>
                      </Stack>
                    </Box>
                  </Stack>
                </Grow>
              ))}
          </Stack>
        )}
        {isMobile && (
          <>
            <CancelIcon
              onClick={() => closeModal()}
              sx={{
                position: 'absolute',
                top: '1%',
                left: '1%',
                fontSize: '3rem',
                color: 'red',
              }}
            />
            {currentCourse.type === 'group' && (
              <Button
                onClick={() => setCourseNum(courseNum === 0 ? 1 : 0)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '2%',
                  minWidth: '4rem',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  padding: '0',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ display: 'flex' }}
              >
                {courseNum === 1 ? (
                  <ChevronLeftIcon
                    sx={{ color: '#f4d40d', fontSize: '3.2rem' }}
                  />
                ) : (
                  <ChevronRightIcon
                    sx={{ color: '#f4d40d', fontSize: '3.2rem' }}
                  />
                )}
              </Button>
            )}
          </>
        )}
      </Box>
    </ModalBox>
  )
}

export default CourseModal
