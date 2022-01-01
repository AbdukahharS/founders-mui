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
    address: ' Milliy Bog metro station, opposite to Oliy Majlis',
  },
  courseModal: {
    duration: 'Course duration',
    month: 'months',
    requirement: 'Minimum requirement',
    price: 'Price',
    soum: 'soum/month',
    enroll: 'Enroll',
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
    card: {
      learn: 'Batafsil',
    },
  },
  features: {
    heading: 'Qulayliklar',
  },
  instructors: {
    heading: 'Ustozlar',
  },
  contact: {
    heading: "Biz bilan bog'laning",
    address: "Milliy Bog' metro bekati, Oliy majlis qarshisida",
  },
  courseModal: {
    duration: 'Kurs davomiyligi',
    month: 'oy',
    requirement: 'Minimal bosqich',
    price: 'Narx',
    soum: "so'm/oy",
    enroll: 'Kursga yozilish',
  },
}

const russian = {
  lang: 'ru',
  navbar: {
    courses: 'Курсы',
    features: 'Функции',
    instructors: 'Инструкторы',
    contact: 'Свяжитесь с нами',
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
    card: {
      learn: 'Выучить больше',
    },
  },
  features: {
    heading: 'Функции',
  },
  instructors: {
    heading: 'Инструкторы',
  },
  contact: {
    heading: 'Связаться с нами',
    address: 'Станция Миллий Бог, напротив Олий Мажлис',
  },
  courseModal: {
    duration: 'Продолжительность курса',
    month: 'месяца',
    requirement: 'Минимальное требование',
    price: 'Цена',
    soum: 'сум/месяца',
    enroll: 'Записываться',
  },
}

export { english, uzbek, russian }
