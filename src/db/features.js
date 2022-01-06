import BookIcon from '@mui/icons-material/Book'
import GroupIcon from '@mui/icons-material/Group'
import WifiIcon from '@mui/icons-material/Wifi'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EventIcon from '@mui/icons-material/Event'
import SchoolIcon from '@mui/icons-material/School'
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt'

const features = [
  {
    icon: AccessTimeIcon,
    name: { eng: 'Faster Development', ru: 'Более быстрые курсы' },
    description: {
      eng: 'Unlike others, accomplish the whole 6-level-English courses "From zero to hero" in only 12 months.',
      ru: '"Из грязи в князи" всего за 12 месяцев.',
    },
  },
  {
    icon: GroupIcon,
    name: { eng: '2 Teacher System', ru: '2-х преподавательская система' },
    description: {
      eng: 'Classes with professional IELTS instructors with high bands as "main teachers" and extra classes from our energetic and inspiring "academic supports".',
      ru: 'Профессиональные инструкторы IELTS с высокими баллами в качестве "main teacher" и брать дополнит ельные уроки у нашей энергичной и вдохновляющей "academic supports"',
    },
  },
  {
    icon: CreditCardIcon,
    name: { eng: 'Discount Card', ru: 'Дисконтная карта' },
    description: {
      eng: 'Take from 10% to 50% discounts according to your active membership and successful performance in mock exams.',
      ru: 'Скидки от 10% до 50% согласно вашему активному членству и удачное исполнение в экзамены',
    },
  },
  {
    icon: SchoolIcon,
    name: {
      eng: 'Free Educational Materials',
      ru: 'Бесплатные учебные материалы',
    },
    description: {
      eng: 'You will be provided with 6 copyrighted books.',
      ru: 'Вам будет предоставлено 6 авторскими книгами',
    },
  },
  {
    icon: OfflineBoltIcon,
    name: { eng: 'Electronic Vocabulary', ru: 'Электронная лексика' },
    description: {
      eng: 'Use our effective method to have a massive vocabulary source in your fluent speech with perfect, real American pronunciation.',
    },
  },
  {
    icon: AccountCircleIcon,
    name: { eng: 'Personal Account', ru: 'Персональный аккаунт' },
    description: {
      eng: 'Be aware of your learning process from monthly statistics based on the regular lesson performances and mock exam results.',
      ru: 'Будьте в курсе вашего процесса обучения на основе ежемесячной статистики на основе о выступлениях на обычных уроках и пробных результатах экзаменов',
    },
  },
  {
    icon: EventIcon,
    name: { eng: 'Sunday events', ru: 'Sunday events', uz: 'Sunday events' },
    description: {
      eng: 'Fun and easy way to learn English with different activities (*Speaking Clubs *Bookclubs *CoffeeClubs *Movie Clubs *Mock exams)',
      ru: 'Веселый и простой способ выучить английский язык с помощью различных занятий (*разговорные клубы *книжные клубы *кофейные клубы *киноклубы *пробные экзамены)',
    },
    link: { name: 'Go to events', path: '/events' },
  },
  {
    icon: WifiIcon,
    name: { eng: '24/7 Online Service', ru: '24/7 онлайн-сервис' },
    description: { eng: '', ru: '' },
  },
  {
    icon: BookIcon,
    name: { eng: 'Libary', ru: 'Библиотека', uz: 'Kutubxona' },
    description: {
      eng: 'We have our own library for everyone.',
      ru: 'У нас есть собственная библиотека для всех.',
    },
    link: { name: 'Go to library', path: '/library' },
  },
]

export default features
