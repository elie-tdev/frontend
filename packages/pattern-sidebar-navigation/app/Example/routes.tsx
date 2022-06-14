import React from 'react'

import GridIcon from '@mui/icons-material/Grid3x3'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'

import { NavItemArray } from '../../lib'

export const nav_routes: NavItemArray = [
  {
    title: 'Home',
    href: '/home',
    icon: <HomeIcon />,
    testid: 'something',
  },
  {
    title: 'This Title is Too Long and Should Not Overflow',
    icon: <PersonIcon />,
    children: [
      {
        title: 'This Title is Too Long and Should Not Overflow',
        href: '/about/history',
        icon: <PersonIcon />,
      },
      { title: 'Timeline', href: '/about/timeline', icon: <PersonIcon /> },
      { title: 'Values', href: '/about/values', icon: <PersonIcon /> },
      {
        title: 'This Title is Too Long and Should Not Overflow',
        icon: <PersonIcon />,
        children: [
          {
            title: 'Culture',
            href: '/about/join/culture',
            icon: <PersonIcon />,
          },
          { title: 'Openings', href: '/about/join/openings' },
          { title: 'Apply', href: '/about/join/how-to' },
        ],
      },
    ],
  },
  {
    title: 'About',
    icon: <PersonIcon />,
    testid: 'about',
    children: [
      // { title: 'History', href: '/about/history' },
      // { title: 'Timeline', href: '/about/timeline' },
      // { title: 'Values', href: '/about/values' },
      { title: 'History', href: '/about/history', icon: <PersonIcon /> },
      { title: 'Timeline', href: '/about/timeline', icon: <PersonIcon /> },
      { title: 'Values', href: '/about/values', icon: <PersonIcon /> },
      {
        title: 'Join',
        icon: <PersonIcon />,
        children: [
          {
            title: 'Culture',
            href: '/about/join/culture',
            icon: <PersonIcon />,
          },
          { title: 'Openings', href: '/about/join/openings' },
          { title: 'Apply', href: '/about/join/how-to' },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    hiddenFrame: true,
    testid: 'settings',
    triggerId: 'settings',
    children: [
      {
        title: 'All',
        href: '/settings/all',
        testid: 'settings-all',
      },
      { title: 'Other', href: '/settings/other', testid: 'settings-other' },
      {
        title: 'Something',
        href: '/settings/something',
        testid: 'settings-something',
      },
    ],
  },
  {
    title: 'Products',
    icon: <GridIcon />,
    children: [
      { title: 'Base', href: '/products/base' },
      { title: 'Second', href: '/products/second' },
      {
        title: 'Lineup',
        children: [
          { title: 'Item 1', href: '/products/lineup/item-1' },
          { title: 'Item 2', href: '/products/lineup/item-2' },
          { title: 'Item 3', href: '/products/lineup/item-3' },
          { title: 'Item 4', href: '/products/lineup/item-4' },
          { title: 'Item 5', href: '/products/lineup/item-5' },
          { title: 'Item 6', href: '/products/lineup/item-6' },
          {
            title: 'Item 7',
            forceNewFrame: true,
            children: [
              {
                title: 'Intro',
                icon: <PersonIcon />,
                href: '/products/lineup/item-7/intro',
              },
              { title: 'Specs', href: '/products/lineup/item-7/specs' },
              { title: 'More', href: '/products/lineup/item-7/more' },
              { title: 'Details', href: '/products/lineup/item-7/details' },
            ],
          },
        ],
      },
    ],
  },
]
