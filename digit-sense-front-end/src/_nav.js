import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import { cilPeople } from '@coreui/icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
