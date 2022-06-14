import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

import {
  RouterNavItemArray,
  AuthRouteStatus,
} from 'design-system/utils-react-router'

import { Pages } from '@pages/index'
const e = (name: string) => <div>Welcome ({name})</div>

const authCheck = (state: boolean): AuthRouteStatus => {
  // this will run anytime a component with this check is mounted
  if (state === true) {
    return { valid: state }
  } else {
    return { valid: false, redirectTo: '/u/login' }
  }
}

export const navRoutes: RouterNavItemArray<
  { example: React.FC<any> },
  boolean
> = [
  {
    title: 'Home',
    path: 'home',
    element: <Pages.Home />,
    index: true,
    icon: <HomeIcon />,
    testid: 'something',
  },
  {
    title: 'User',
    path: '/u',
    hiddenFrame: true,
    triggerId: 'user-panel',
    children: [
      {
        title: 'Login',
        path: 'login',
        element: <Pages.Login />,
        testid: 'login-page',
      },
    ],
  },
  {
    title: 'About',
    icon: <PersonIcon />,
    testid: '/about',
    path: 'about',
    children: [
      {
        title: 'Authenticated',
        element: e('about/authenticated'),
        authCheck,
        path: 'authenticaed',
        icon: <LockIcon />,
      },
      {
        title: 'Timeline',
        element: e('about/timeline'),
        path: 'timeline',
        icon: <PersonIcon />,
      },
      {
        title: 'Values',
        element: e('about/values'),
        path: 'values',
        icon: <PersonIcon />,
      },
      {
        title: 'Join',
        icon: <PersonIcon />,
        path: 'join',
        children: [
          {
            title: 'Culture',
            path: 'culture',
            element: e('about/culture'),
            icon: <PersonIcon />,
          },
          { title: 'Openings', element: e('about/openings'), path: 'openings' },
          { title: 'Apply', element: e('about/how-to'), path: 'how-to' },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    hiddenFrame: true,
    testid: 'settings',
    path: 'settings',
    triggerId: 'settings',
    children: [
      {
        title: 'All',
        path: 'all',
        element: e('settings/all'),
        testid: 'settings-all',
      },
      {
        title: 'Other',
        element: e('settings/other'),
        path: 'other',
        testid: 'settings-other',
      },
      {
        title: 'Something',
        path: 'something',
        element: e('settings/something'),
        testid: 'settings-something',
      },
    ],
  },
]
