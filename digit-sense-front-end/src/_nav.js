import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import { cilMediaRecord, cilPeople } from '@coreui/icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Record',
  //   to: '/record',
  //   icon: <CIcon icon={cilMediaRecord} customClassName="nav-icon" />,
  // },
]

export default _nav
