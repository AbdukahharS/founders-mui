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
import QAModal from '../components/QAModal'
// MUI
import { lightTheme, darkTheme } from '../muiConfig'
import { Stack, Typography } from '@mui/material'
// DB
const courses = require('../db/courses')

const Home = ({ theme, setTheme, device, language, changeLang }) => {
  const [currentCourse, setCurrentCourse] = useState(courses.default[0])
  const [curVideo, setCurVideo] = useState('teacher1.mp4')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openQA, setOpenQA] = useState(false)

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
      <QAModal openQA={openQA} setOpenQA={setOpenQA} />
      <Stack
        sx={{
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          // width: '4rem',
          height: '3rem',
          py: 0.4,
          px: 1.4,
          borderRadius: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: '1001',
          flexDirection: 'row',
        }}
        backgroundColor='primary.main'
        onClick={() => setOpenQA(true)}
      >
        <img
          style={{ width: '2rem', marginRight: '0.6rem' }}
          src={
            theme === darkTheme
              ? require('../images/help-light.png').default
              : require('../images/help-dark.png').default
          }
          alt='Help Icon'
        />
        <Typography color='secondary'>{language.help}</Typography>
      </Stack>
    </>
  )
}

export default Home
