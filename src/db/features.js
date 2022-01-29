import BookIcon from '@mui/icons-material/Book'
import GroupIcon from '@mui/icons-material/Group'
import WifiIcon from '@mui/icons-material/Wifi'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EventIcon from '@mui/icons-material/Event'
import SchoolIcon from '@mui/icons-material/School'
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'

const features = [
  {
    icon: AccessTimeIcon,
    name: {
      eng: 'Faster Development',
      ru: 'Более быстрые курсы',
      uz: 'Tezroq rivojlanish',
    },
    description: {
      eng: 'Unlike others, accomplish the whole 6-level-English courses "From zero to hero" in only 12 months.',
      ru: 'В отличие от других, пройти все 6-уровневые курсы английского языка «Из грязи в князи» всего за 12 месяцев.',
      uz: `Boshqalardan farqli o'laroq,  6 darajali umumiy ingliz tili kurslarini "0" dan mukkamal darajaga atigi 12 oyda tamomlang.`,
    },
  },
  {
    icon: GroupIcon,
    name: {
      eng: '2 Teacher System',
      ru: '2-х преподавательская система',
      uz: '2 ustoz tizimi',
    },
    description: {
      eng: 'Classes with professional IELTS instructors with high bands as "main teachers" and extra classes from our energetic and inspiring "academic supports".',
      ru: 'Профессиональные инструкторы IELTS с высокими баллами в качестве "main teacher" и брать дополнит ельные уроки у нашей энергичной и вдохновляющей "academic supports"',
      uz: `"Asosiy o'qituvchilar" sifatida yuqori natijalarga erishgan professional IELTS instruktorlari bilan mashg'ulotlar va bizning serg'ayrat va ilhomlantiruvchi "academic support"imizdan qo'shimcha darslar.`,
    },
  },
  {
    icon: CreditCardIcon,
    name: {
      eng: 'Discount Card',
      ru: 'Дисконтная карта',
      uz: 'Chegirma kartasi',
    },
    description: {
      eng: 'Take from 10% to 15% discounts according to your active membership and successful performance in mock exams.',
      ru: 'Скидки от 10% до 15% согласно вашему активному членству и удачное исполнение в экзамены',
      uz: 'Faol aʼzoligingiz va sinov imtihonlarida muvaffaqiyatli ishtirok etishingizga qarab 10% dan 15% gacha chegirmalardan foydalaning.',
    },
  },
  {
    icon: SchoolIcon,
    name: {
      eng: 'Free Educational Materials',
      ru: 'Бесплатные учебные материалы',
      uz: "Bepul o'quv materiallari",
    },
    description: {
      eng: 'You will be provided with 3 Kids English, 3 General English and 6 IELTS copyrighted books.',
      ru: 'Вам будут предоставлены 3 книги по английскому языку для детей, 3 книги по общему английскому языку и 6 книг, защищенных авторским правом IELTS.',
      uz: 'Sizga mualliflik huquqi bilan himoyalangan 3 ta Kids English, 3 General English va 6 IELTS kitoblar taqdim etiladi.',
    },
  },
  {
    icon: OfflineBoltIcon,
    name: {
      eng: 'Electronic Vocabulary',
      ru: 'Электронная лексика',
      uz: "Elektron lug'at",
    },
    description: {
      eng: 'Use our effective method to have a massive vocabulary source in your fluent speech with perfect, real British pronunciation.',
      ru: 'Используйте наш эффективный метод, чтобы иметь обширный словарный запас в вашей беглой речи с идеальным, настоящим британским произношением.',
      uz: "Mukammal, haqiqiy ingliz talaffuzi bilan ravon nutqingizda katta lug'at manbasiga ega bo'lish uchun samarali usulimizdan foydalaning.",
    },
  },
  {
    icon: AccountCircleIcon,
    name: {
      eng: 'Personal Account',
      ru: 'Персональный аккаунт',
      uz: 'Shaxsiy Hisob',
    },
    description: {
      eng: 'Be aware of your learning process from monthly statistics based on the regular lesson performances and mock exam results.',
      ru: 'Будьте в курсе вашего процесса обучения на основе ежемесячной статистики на основе о выступлениях на обычных уроках и пробных результатах экзаменов',
      uz: '',
    },
  },
  {
    icon: EventIcon,
    name: { eng: 'Sunday events', ru: 'Sunday events', uz: 'Sunday events' },
    description: {
      eng: 'Fun and easy way to learn English with different activities (*Speaking Clubs *Bookclubs *CoffeeClubs *Movie Clubs *Mock exams)',
      ru: 'Веселый и простой способ выучить английский язык с помощью различных занятий (*разговорные клубы *книжные клубы *кофейные клубы *киноклубы *пробные экзамены)',
      uz: '',
    },
    link: { name: 'Go to events', path: '/events' },
  },
  {
    icon: WifiIcon,
    name: {
      eng: '24/7 Online Service',
      ru: '24/7 онлайн-сервис',
      uz: '24/7 Onlayn Xizmat',
    },
    description: { eng: '', ru: '', uz: '' },
  },
  {
    icon: BookIcon,
    name: { eng: 'Libary', ru: 'Библиотека', uz: 'Kutubxona' },
    description: {
      eng: 'We have our own library for everyone.',
      ru: 'У нас есть собственная библиотека для всех.',
      uz: "Bizda hamma uchun o'zimizning kutubxonamiz bor.",
    },
    link: { name: 'Go to library', path: '/library' },
  },
  {
    icon: CastForEducationIcon,
    name: { eng: 'More lessons', ru: 'Больше уроков', uz: "Ko'proq darslar" },
    description: {
      eng: 'Unlike others, our courses include 20 lessons per month.',
      ru: 'В отличие от других, наши курсы включают 20 уроков в месяц.',
      uz: "Boshqalardan farqli o'laroq, bizning kurslarimiz oyiga 20 ta darsni o'z ichiga oladi.",
    },
  },
]

export default features
