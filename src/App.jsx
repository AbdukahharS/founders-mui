// Dependencies
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import Library from './pages/Library'
import Events from './pages/Events'
// MUI
import { ThemeProvider } from '@mui/material/styles'
// Config
import { lightTheme, darkTheme } from './muiConfig'
// DB
import { uzbek, english, russian } from './db/languages'

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
  )
  const [language, setLanguage] = useState(
    localStorage.getItem('language') === 'uz'
      ? uzbek
      : localStorage.getItem('language') === 'ru'
      ? russian
      : english
  )
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 600 ? true : false
  )
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 600 && window.innerWidth < 1024 ? true : false
  )

  const changeLang = (lang) => {
    setLanguage(lang === 'eng' ? english : lang === 'uz' ? uzbek : russian)
    localStorage.setItem('language', lang)
  }

  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth <= 600 ? true : false)
    setIsTablet(
      window.innerWidth > 600 && window.innerWidth <= 1024 ? true : false
    )
  })

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Home
                  theme={theme}
                  setTheme={setTheme}
                  isTablet={isTablet}
                  isMobile={isMobile}
                  language={language}
                  changeLang={changeLang}
                />
              }
            />
            <Route
              path='/library'
              element={
                <Library
                  theme={theme}
                  setTheme={setTheme}
                  isTablet={isTablet}
                  isMobile={isMobile}
                />
              }
            />

            <Route
              path='/events'
              element={
                <Events
                  theme={theme}
                  setTheme={setTheme}
                  isTablet={isTablet}
                  isMobile={isMobile}
                />
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
