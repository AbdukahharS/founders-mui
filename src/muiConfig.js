import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: 'linear-gradient(#f4d40d, #feac14)',
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
  typography: {
    fontFamily: `"Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: '#191919',
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
  typography: {
    fontFamily: `"Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
})

export { lightTheme, darkTheme }
