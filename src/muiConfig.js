import { createTheme } from '@mui/material/styles'
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#fff' },
    primary: {
      main: '#f4d40d',
    },
    secondary: {
      main: '#191919',
    },
    light: { main: '#fff' },
    gold: { main: '#f4d40d' }
  },
  typography: {
    fontFamily: `Josefin Slab, Raleway, Roboto Slab, Helvetica, Arial, sans-serif`,
  },
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#191919' },
    primary: {
      main: '#191919',
    },
    secondary: {
      main: '#f4d40d',
    },
    light: {
      main: '#474747',
      contrastText: '#fff',
    },
    gold: { main: '#f4d40d' }
  },
  typography: {
    fontFamily: `Josefin Slab, Raleway, Roboto Slab, Helvetica, Arial, serif`,
  },
})
export { lightTheme, darkTheme }
