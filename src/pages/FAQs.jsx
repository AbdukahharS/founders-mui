import React from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  Box,
  Container,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { lightTheme, darkTheme } from '../muiConfig'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// DB FAQs
import faqs from '../db/faqs'

const FAQs = ({ theme, setTheme, device }) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }

  return (
    <Stack
      direction='column'
      alignItems='stretch'
      minHeight='100vh'
      justifyContent='stretch'
      bgcolor='info.light'
    >
      <Box
        sx={
          theme.palette.mode === 'dark'
            ? {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                py: '0.6rem',
              }
            : {
                backgroundImage: theme.palette.background,
                color: 'primary.contrastText',
                py: '0.6rem',
              }
        }
      >
        <Container>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              <Link to='/'>
                <img
                  src={theme === lightTheme ? logoDark : logo}
                  style={{ width: '4rem' }}
                  alt='Founders Logo'
                />
              </Link>
              <Typography sx={{ fontSize: '2.8rem' }}>
                {device === 'xs' || device === 'sm'
                  ? 'FAQs'
                  : 'Frequently Asked Questions'}
              </Typography>
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
      <Box py={4}>
        <Container>
          <Stack>
            {faqs.map((faq, i) => (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography fontSize='1.4rem'>{faq.quest}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontSize='1.2rem'>{faq.ans}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}

export default FAQs
