import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Courses from './components/Courses'
import Features from './components/Features'
import Contacts from './components/Contacts'
import Teachers from './components/Teachers'
import Footer from './components/Footer'
import CourseModal from './components/CourseModal'
import MenuModal from './components/MenuModal'

import { lightTheme, darkTheme } from './muiConfig'
import { ThemeProvider } from '@mui/material/styles'

function App() {
  const [currentCourse, setCurrentCourse] = useState({
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.png',
    duration: '3 months',
    requirement: 'Elementary',
  })
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
  )
  const [openMenu, setOpenMenu] = useState(false)

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    let themeColor = theme === darkTheme ? 'dark' : 'light'
    localStorage.setItem('theme', themeColor)
  })

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar
            setOpenMenu={setOpenMenu}
            theme={theme}
            setTheme={setTheme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
          />
          <Header />
          <Courses
            setOpenModal={setOpenModal}
            setCurrentCourse={setCurrentCourse}
          />
          <Features />
          <Teachers />
          <Contacts />
          <Footer theme={theme} lightTheme={lightTheme} darkTheme={darkTheme} />
          <CourseModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            currentCourse={currentCourse}
          />
          <MenuModal
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            theme={theme}
            setTheme={setTheme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
          />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
