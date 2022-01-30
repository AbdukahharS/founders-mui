const courses = [
  {
    name: 'General English',
    type: 'course',
    description: {
      eng: 'In this course, you can improve your English language Grammar and Conversation skills.',
      ru: 'В этом курсы вы сможете улучшить свою грамматика английского языка .',
      uz: 'Bu kursda siz Umumiy Ingliz tili va uning Grammatikasini mukammal organasiz.',
    },
    banner: 'general-english.mp4',
    length: '8',
    duration: '2',
    requirement: 'Beginner',
    price: '650 000',
  },
  {
    name: 'English for Kids',
    type: 'course',
    description: {
      eng: 'Lead your children towards better career path. Let them learn English with us.',
      ru: 'Направляйте своих детей на лучший карьерный путь. Пусть учат английский с нами.',
      uz: "Farzandlaringizni yaxshiroq karyera tomon yetaklang. Ularni Ingliz tilini biz bilan o'rganishlariga imkon bering.",
    },
    banner: 'english-for-kids.mp4',
    duration: '2',
    length: '12',
    requirement: 'No requirement',
    price: '450 000',
  },
  {
    name: 'IELTS courses',
    type: 'group',
    description: {
      eng: '',
      ru: '',
      uz: '',
    },
    items: [
      {
        name: 'IELTS Turbo',
        description: {
          eng: 'Preparation course for 7+',
          ru: 'Это интенсивный курс подготовки к IELTS',
          uz: 'IELTS uchun jadal tayyorlanish kursi.',
        },
        banner: 'ielts-turbo.mp4',
        duration: '2',
        length: '2',
        requirement: 'Advanced',
        price: '700 000',
      },
      {
        name: 'IELTS Up',
        description: {
          eng: 'Preparation course for 6+ in 3 months.',
          ru: 'Этот курс состоит из 6 уровней',
          uz: "Bu kurs 6 bosqichni o'z ichiga oladi.",
        },
        banner: 'ielts-up.mp4',
        duration: '2',
        length: '3',
        requirement: 'Intermediate',
        price: '650 000',
      },
    ],
    banner: 'ielts.mp4',
  },
]

export default courses
