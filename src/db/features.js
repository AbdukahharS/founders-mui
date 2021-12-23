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
    name: 'Only 2 Months',
    description:
      'Unlike others, accomplish the whole 6-level-English courses "From zero to hero" in only 12 months.',
  },
  {
    icon: GroupIcon,
    name: '2 Teacher System',
    description:
      'Classes with professional IELTS instructors with high bands as main teachers. Take extra classes from our energetic and inspiring "academic supports".',
  },
  {
    icon: CreditCardIcon,
    name: 'Discount Card',
    description:
      'Take from 10% to 50% discounts according to your active membership and successful performance in mock exams.',
  },
  {
    icon: AccountCircleIcon,
    name: 'Personal Account',
    description:
      'Be aware of your learning process from monthly statistics based on the regular lesson performances and mock exam results.',
  },
  {
    icon: BookIcon,
    name: 'Free Books',
    description: 'Collect books and own electronic vocabulary.',
    link: { name: 'Go to library', path: '/library' },
  },
  {
    icon: EventIcon,
    name: 'Different Sunday events',
    description:
      'Fun and easy way to learn English: *Speaking clubs *Bookclubs *Coffecups *Movie clubs *Bookclubs *Mock exams',
    link: { name: 'Go to events', path: '/events' },
  },
  {
    icon: WifiIcon,
    name: '24/7 online service',
  },
]

export default features
