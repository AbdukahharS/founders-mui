import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ffe55b',
      //   contrastText: '#191919',
    },
    secondary: {
      main: '#191919',
      //   contrastText: '#fff',
    },
    light: {
      main: '#fff',
    },
    info: {
      main: '#fff',
    },
    error: {
      main: '#fff',
    },
    success: {
      main: '#ffe55b88',
    },
  },
})

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#191919',
      //   contrastText: '#fff',
    },
    secondary: {
      main: '#ffdf33',
      //   contrastText: '#191919',
    },
    light: {
      main: '#fff',
    },
    info: {
      main: '#191919',
    },
    error: {
      main: '#ffdf33',
    },
    success: {
      main: '#19191988',
    },
  },
})

export { lightTheme, darkTheme }
