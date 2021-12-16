import React from 'react'
import {
  Typography,
  Box,
  Container,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Link,
} from '@mui/material'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import DownloadIcon from '@mui/icons-material/Download'

const Library = ({ theme, setTheme }) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  return (
    <>
      <Box bgcolor='primary.main' color='primary.contrastText' py='1rem'>
        <Container>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              <img
                src={theme === lightTheme ? logoDark : logo}
                style={{ width: '4rem' }}
                alt='Founders Logo'
              />
              <Typography variant='h2'>Library</Typography>
            </Stack>
            <Button onClick={() => clickHandler()}>
              {theme === lightTheme ? (
                <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
              ) : (
                <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
              )}
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box /*bgcolor='info.light' color='info.contrastText'*/ py={4}>
        <Container>
          <Accordion
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main' }} />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography fontSize='1.6rem'>
                Books related to reading skill
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Divider sx={{ backgroundColor: 'secondary.main' }} />
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  py={1}
                  px={4}
                >
                  <img
                    style={{ height: '8rem' }}
                    src={require('../images/reading1.jpg').default}
                  />
                  <Typography>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia, temporibus.
                  </Typography>
                  <Link
                    href={require('../books/reading2.pdf').default}
                    download
                  >
                    <DownloadIcon sx={{ color: 'secondary.main' }} />
                  </Link>
                </Stack>
                <Divider sx={{ backgroundColor: 'secondary.main' }} />
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  py={1}
                  px={4}
                >
                  <img
                    style={{ height: '8rem' }}
                    src={require('../images/reading2.jpg').default}
                  />
                  <Typography>
                    Eveniet quia nihil quas sequi fugiat mollitia quod
                    cupiditate laborum consequatur!
                  </Typography>
                  <Link
                    href={require('../books/reading2.pdf').default}
                    download
                  >
                    <DownloadIcon sx={{ color: 'secondary.main' }} />
                  </Link>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main' }} />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography fontSize='1.6rem'>
                Books related to Writing
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Stack>
                  <Divider sx={{ backgroundColor: 'secondary.main' }} />
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    py={1}
                    px={4}
                  >
                    <img
                      style={{ height: '8rem' }}
                      src={require('../images/reading1.jpg').default}
                    />
                    <Typography>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Officia, temporibus.
                    </Typography>
                    <Link
                      href={require('../books/reading2.pdf').default}
                      download
                    >
                      <DownloadIcon sx={{ color: 'secondary.main' }} />
                    </Link>
                  </Stack>
                  <Divider sx={{ backgroundColor: 'secondary.main' }} />
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    py={1}
                    px={4}
                  >
                    <img
                      style={{ height: '8rem' }}
                      src={require('../images/writing2.jpg').default}
                    />
                    <Typography>
                      Eveniet quia nihil quas sequi fugiat mollitia quod
                      cupiditate laborum consequatur!
                    </Typography>
                    <Link
                      href={require('../books/reading2.pdf').default}
                      download
                    >
                      <DownloadIcon sx={{ color: 'secondary.main' }} />
                    </Link>
                  </Stack>
                </Stack>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
    </>
  )
}

export default Library
