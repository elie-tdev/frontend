import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'

const Login = lazy(() => import('../../pages/pages/Login'))
const About = lazy(() => import('../../pages/pages/About'))
const Users = lazy(() => import('../../pages/pages/Users'))

export const PagesRoutes: (PartialRouteObject & { name: string })[] = [
  {
    name: 'Login',
    path: 'login',
    element: <Login />,
  },
  {
    name: 'About',
    path: 'about',
    element: <About />,
  },
  {
    name: 'Users',
    path: 'users',
    element: <Users />,
  },
]
