// Dependencies
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import Library from './pages/Library'
// MUI
import { ThemeProvider } from '@mui/material/styles'
// Config
import { lightTheme, darkTheme } from './muiConfig'

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
  )
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/library' element={<Library />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
