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
import FAQs from './pages/FAQs'

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
  const [device, setDevice] = useState(
    window.innerWidth <= 480
      ? 'xs'
      : window.innerWidth <= 768
      ? 'sm'
      : window.innerWidth <= 1280
      ? 'md'
      : window.innerWidth <= 1680
      ? 'lg'
      : 'xl'
  )

  const changeLang = (lang) => {
    setLanguage(lang === 'eng' ? english : lang === 'uz' ? uzbek : russian)
    localStorage.setItem('language', lang)
  }

  window.addEventListener('resize', () => {
    setDevice(
      window.innerWidth <= 480
        ? 'xs'
        : window.innerWidth <= 768
        ? 'sm'
        : window.innerWidth <= 1280
        ? 'md'
        : window.innerWidth <= 1680
        ? 'lg'
        : 'xl'
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
                  device={device}
                  language={language}
                  changeLang={changeLang}
                />
              }
            />
            <Route
              path='/library'
              element={
                <Library theme={theme} setTheme={setTheme} device={device} />
              }
            />
            <Route
              path='/faqs'
              element={
                <FAQs theme={theme} setTheme={setTheme} device={device} />
              }
            />
            <Route
              path='/events'
              element={
                <Events theme={theme} setTheme={setTheme} device={device} />
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
