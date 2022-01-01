import BookIcon from '@mui/icons-material/Book'
import GroupIcon from '@mui/icons-material/Group'
import WifiIcon from '@mui/icons-material/Wifi'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EventIcon from '@mui/icons-material/Event'

const features = [
  {
    icon: AccessTimeIcon,
    name: 'Faster Development',
    description: {
      eng: 'Unlike others, accomplish the whole 6-level-English courses "From zero to hero" in only 12 months.',
      ru: '',
    },
  },
  {
    icon: GroupIcon,
    name: '2 Teacher System',
    description: {
      eng: 'Classes with professional IELTS instructors with high bands as "main teachers" and extra classes from our energetic and inspiring "academic supports".',
      ru: '',
    },
  },
  {
    icon: CreditCardIcon,
    name: 'Discount Card',
    description: {
      eng: 'Take from 10% to 50% discounts according to your active membership and successful performance in mock exams.',
      ru: '',
    },
  },
  {
    icon: AccountCircleIcon,
    name: 'Free Educational Materials',
    description: {
      eng: 'Be aware of your learning process from monthly statistics based on the regular lesson performances and mock exam results.',
      ru: '',
    },
  },
  {
    icon: BookIcon,
    name: 'Electronic Vocabulary',
    description: {
      eng: 'Collect books and own electronic vocabulary.',
    },
    link: { name: 'Go to library', path: '/library' },
  },
  {
    icon: AccountCircleIcon,
    name: 'Personal Account',
    description: {
      eng: 'Fun and easy way to learn English: *Speaking clubs *Bookclubs *Coffecups *Movie clubs *Bookclubs *Mock exams',
      ru: '',
    },
    link: { name: 'Go to events', path: '/events' },
  },
  {
    icon: EventIcon,
    name: 'Sunday events',
    description: {
      eng: 'Fun and easy way to learn English (*Speaking Clubs *Bookclubs *CoffeeClubs *Movie Clubs *Mock exams)',
      ru: '',
    },
  },
  {
    icon: WifiIcon,
    name: '24/7 Online Service',
    description: { eng: '', ru: '' },
  },
  { icon: BookIcon, name: 'Libary', description: { eng: '', ru: '' } },
]

export default features
