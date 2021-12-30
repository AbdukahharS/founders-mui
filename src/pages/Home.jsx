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
import { lightTheme, darkTheme } from '../muiConfig'

const Home = ({ theme, setTheme, device, language, changeLang }) => {
  const [currentCourse, setCurrentCourse] = useState({
    name: 'General English',
    description:
      'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Phasellus molestie enim.',
    banner: 'general-english.mp4',
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
  }, [theme])

  return (
    <>
      <Navbar
        setOpenMenu={setOpenMenu}
        theme={theme}
        setTheme={setTheme}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        device={device}
        language={language}
        changeLang={changeLang}
      />
      <Header device={device} />
      <Courses
        device={device}
        setOpenModal={setOpenModal}
        setCurrentCourse={setCurrentCourse}
        language={language}
      />
      <Features device={device} theme={theme} language={language} />
      <Teachers
        setCurVideo={setCurVideo}
        setIsVideoOpen={setIsVideoOpen}
        theme={theme}
        language={language}
      />
      <Contacts language={language} />
      <Footer theme={theme} lightTheme={lightTheme} />
      <CourseModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentCourse={currentCourse}
        device={device}
        language={language}
      />
      <MenuModal
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        theme={theme}
        setTheme={setTheme}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        language={language}
        changeLang={changeLang}
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
