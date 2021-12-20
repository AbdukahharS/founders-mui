import React, { useState, useEffect } from 'react'
// Components
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Courses from '../components/Courses'
import Features from '../components/Features'
import Contacts from '../components/Contacts'
import Teachers from '../components/Teachers'
import Footer from '../components/Footer'
// Modals
import MenuModal from '../components/MenuModal'
import InstructorModal from '../components/InstructorModal'
import CourseModal from '../components/CourseModal'
// MUI
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
// import { Stack } from '@mui/material'
// Config
import { lightTheme, darkTheme } from '../muiConfig'

// const style = {
//   position: 'fixed',
//   bottom: '2%',
//   right: '2%',
//   width: '3.6rem',
//   height: '3.6rem',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '50%',
//   border: '2px solid #fff',
//   cursor: 'pointer',
// }

const Home = ({ theme, setTheme, isMobile, isTablet }) => {
  const [currentCourse, setCurrentCourse] = useState({
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.png',
    duration: '3 months',
    requirement: 'Elementary',
  })
  const [curVideo, setCurVideo] = useState('teacher1.mp4')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    let themeColor = theme === darkTheme ? 'dark' : 'light'
    localStorage.setItem('theme', themeColor)
  })

  return (
    <>
      <Navbar
        setOpenMenu={setOpenMenu}
        theme={theme}
        setTheme={setTheme}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      <Header isMobile={isMobile} isTablet={isTablet} />
      <Courses
        isTablet={isTablet}
        isMobile={isMobile}
        setOpenModal={setOpenModal}
        setCurrentCourse={setCurrentCourse}
      />
      <Features isMobile={isMobile} />
      <Teachers setCurVideo={setCurVideo} setIsVideoOpen={setIsVideoOpen} />
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
      <InstructorModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        curVideo={curVideo}
      />
      {/* <Stack style={style} backgroundColor='primary.main'>
        <QuestionMarkIcon
          sx={{
            color: 'primary.contrastText',
            fontSize: '2rem',
          }}
        />
      </Stack> */}
    </>
  )
}

export default Home
