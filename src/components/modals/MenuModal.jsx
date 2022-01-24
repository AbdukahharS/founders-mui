import {
  Slide,
  Box,
  Button,
  Link,
  Stack,
  Typography,
  Divider,
  Grow,
} from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PublicIcon from '@mui/icons-material/Public'

const style = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  bgcolor: 'light.main',
  color: 'primary.contrastText',
  p: 4,
}

const MenuModal = ({
  openMenu,
  setOpenMenu,
  theme,
  setTheme,
  lightTheme,
  darkTheme,
  language,
  changeLang,
}) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }

  const [openLan, setOpenLan] = React.useState(false)
  const handleChange = async (lang) => {
    changeLang(lang)
    setOpenLan(false)
  }
  return (
    <Slide direction='down' in={openMenu}>
      <Box sx={style} zIndex={1002}>
        <Stack direction='column'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' spacing={2}>
              <Button onClick={() => clickHandler()}>
                {theme === lightTheme ? (
                  <Brightness7Icon
                    fontSize='large'
                    sx={{ color: 'primary.contrastText' }}
                  />
                ) : (
                  <Brightness4Icon
                    fontSize='large'
                    sx={{ color: 'primary.contrastText' }}
                  />
                )}
              </Button>
              <Box>
                <Button
                  onClick={() => {
                    setOpenLan(true)
                    console.log('work')
                  }}
                  sx={{
                    padding: '0.4rem',
                    minWidth: 'unset',
                  }}
                >
                  <PublicIcon sx={{ color: 'primary.contrastText' }} />
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      color: 'primary.contrastText',
                    }}
                  >
                    {language.lang}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: 'secondary.main' }} />
                </Button>
                <Grow in={openLan}>
                  <Stack
                    position='absolute'
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '1rem',
                      zIndex: '1001',
                    }}
                  >
                    {language.navbar.button &&
                      language.navbar.button.otherBtns.map((btn, i) => (
                        <Box
                          onClick={() => handleChange(btn.lang)}
                          key={i}
                          sx={{
                            cursor: 'pointer',
                            py: 1,
                            px: 2,
                            zIndex: 1002,
                          }}
                        >
                          <Typography sx={{ textTransform: 'uppercase' }}>
                            {btn.lang}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                </Grow>
              </Box>
            </Stack>
            <Button onClick={() => setOpenMenu(false)}>
              <CancelIcon fontSize='large' color='secondary' />
            </Button>
          </Stack>
          <Divider
            sx={{ backgroundColor: 'secondary.main', marginY: '1rem' }}
          />
          <Stack onClick={() => setOpenMenu(false)} spacing={0.8}>
            <Link
              href='#courses'
              style={{ fontSize: '1.6rem' }}
              color='inherit'
              underline='hover'
            >
              {language.navbar.courses}
            </Link>
            <Link
              href='#features'
              style={{ fontSize: '1.6rem' }}
              color='inherit'
              underline='hover'
            >
              {language.navbar.features}
            </Link>
            <Link
              href='#instructors'
              style={{ fontSize: '1.6rem' }}
              color='inherit'
              underline='hover'
            >
              {language.navbar.instructors}
            </Link>
            <Link
              href='#contacts'
              style={{ fontSize: '1.6rem' }}
              color='inherit'
              underline='hover'
            >
              {language.navbar.contact}
            </Link>
          </Stack>
          <Divider
            sx={{ backgroundColor: 'secondary.main', marginY: '1rem' }}
          />
          <Stack>
            <Link
              href='tel:+998712055333'
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
              }}
            >
              <Stack
                alignItems='center'
                justifyContent='center'
                borderRadius='50%'
                bgcolor='secondary.main'
                p={1}
                mr={1}
              >
                <LocalPhoneIcon color='primary' />
              </Stack>
              <Typography component='span' fontSize='1.2rem'>
                +998 71 205 53 33
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Slide>
  )
}

export default MenuModal
