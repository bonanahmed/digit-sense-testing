import React from 'react'

const UserList = React.lazy(() => import('./views/users/List'))
const UserForm = React.lazy(() => import('./views/users/Form'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: UserList },
  { path: '/user/:id', name: 'Users', element: UserForm },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
]

export default routes
