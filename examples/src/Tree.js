import avatarPersonnel from './assets/avatar-personnel.svg'

export const tree = {
  id: 100,
  avatar: avatarPersonnel,
  department: '',
  name: 'Henry monger',
  title: 'Manager',
  membership: {
    type: 'convention_in_progress',
    label: 'Conventionnement en cours'
  },
  hasChild: true,
  hasParent: true,
  nbContract: 4,
  totalReports: 3,
  children: [],
}

export const tree1 = [
  {
    id: 36,
    avatar: avatarPersonnel,
    department: '',
    name: 'Tomasz polaski',
    title: 'IT Specialist',
    totalReports: 4,
    hasChild: true,
    hasParent: true,
    nbContract: 8,
    membership: {
      type: 'member',
      label: 'Adhérent'
    },
    children: [],
  },
  {
    id: 32,

    avatar: avatarPersonnel,
    department: '',
    name: 'Emanuel walker',
    title: 'IT Specialist',
    totalReports: 0,
    membership: {
      type: 'cessation_of_activity',
      label: 'Cessation d\'activité'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 25,

    avatar: avatarPersonnel,
    department: '',
    name: 'Kerry peter',
    title: 'IT Specialist',
    totalReports: 3,

    hasChild: true,
    hasParent: true,
    // children: [],
  },
]

export const tree2 = [
  {
    id: 56,

    avatar: avatarPersonnel,
    department: '',
    name: 'Sam John',
    title: 'HR',
    totalReports: 2,
    link: 'https://github.com/unicef/react-org-chart',
    membership: 'contracted',
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 66,

    avatar: avatarPersonnel,
    department: '',
    name: 'John doe',
    title: 'Developer',
    totalReports: 0,
    link: 'https://github.com/unicef/react-org-chart',

    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 76,

    avatar: avatarPersonnel,
    department: '',
    name: 'Emilia rogers',
    title: 'Developer',
    totalReports: 0,
    link: 'https://github.com/unicef/react-org-chart',

    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 60,

    avatar: avatarPersonnel,
    department: '',
    name: 'Ellen cott',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree3 = [
  {
    id: 70,

    avatar: avatarPersonnel,
    department: '',
    name: 'Kenneth dom',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },
  {
    id: 45,

    avatar: avatarPersonnel,
    department: '',
    name: 'Kin baker',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree4 = [
  {
    id: 102,

    avatar: avatarPersonnel,
    department: '',
    name: 'Hendy kinger',
    title: 'Manager',
    totalReports: 0,

    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 455,

    avatar: avatarPersonnel,
    department: '',
    name: 'Kate baker',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },
  {
    id: 444,

    avatar: avatarPersonnel,
    department: '',
    name: 'John medis',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },

  {
    id: 456,

    avatar: avatarPersonnel,
    department: '',
    name: 'Brett lee',
    title: 'IT Officer',
    totalReports: 0,

    hasChild: false,
    hasParent: true,
    children: [],
  },
]
