const english = {
  lang: 'eng',
  navbar: {
    courses: 'Courses',
    features: 'Features',
    instructors: 'Instructors',
    contact: 'Contact Us',
    button: {
      img: 'eng.png',
      otherBtns: [
        { img: 'uz.png', lang: 'uz' },
        { img: 'ru.png', lang: 'ru' },
      ],
    },
  },
  courses: {
    heading: 'Courses',
    btn: { expand: 'See all courses', collapse: 'Collapse' },
  },
  features: {
    heading: 'Features',
  },
  instructors: {
    heading: 'Instructors',
  },
  contact: {
    heading: 'Contact Us',
    address: 'Milliy Bog Station, opposite of Legislative Chamber',
  },
}

const uzbek = {
  lang: 'uz',
  navbar: {
    courses: 'Kurslar',
    features: 'Qulayliklar',
    instructors: 'Ustozlar',
    contact: "Biz bilan bog'laning",
    button: {
      img: 'uz.png',
      otherBtns: [
        { img: 'eng.png', lang: 'eng' },
        { img: 'ru.png', lang: 'ru' },
      ],
    },
  },
  courses: {
    heading: 'Kurslar',
    btn: { expand: "Barcha kurslarni ko'rish", collapse: 'Kamaytirish' },
  },
  features: {
    heading: 'Qulayliklar',
  },
  instructors: {
    heading: 'Ustozlar',
  },
  contact: {
    heading: "Biz bilan bog'laning",
    address: "Milliy Bog' bekati, Oliy majlis qarshisida",
  },
}

const russian = {
  lang: 'ru',
  navbar: {
    courses: 'Курсы',
    features: 'Функции',
    instructors: 'Инструкторы',
    contact: 'Связаться с нами',
    button: {
      img: 'ru.png',
      otherBtns: [
        { img: 'uz.png', lang: 'uz' },
        { img: 'eng.png', lang: 'eng' },
      ],
    },
  },
  courses: {
    heading: 'Курсы',
    btn: { expand: 'Посмотреть все курсы', collapse: 'Крах' },
  },
  features: {
    heading: 'Функции',
  },
  instructors: {
    heading: 'Инструкторы',
  },
  contact: {
    heading: 'Связаться с нами',
    address: 'Milliy Bog Station, opposite of Legislative Chamber',
  },
}

export { english, uzbek, russian }
