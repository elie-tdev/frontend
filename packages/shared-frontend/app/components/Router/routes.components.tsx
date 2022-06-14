import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'

const Buttons = lazy(() => import('../../pages/components/Buttons'))
const Checkboxes = lazy(() => import('../../pages/components/Checkbox'))
const Inputs = lazy(() => import('../../pages/components/Input'))
const Radios = lazy(() => import('../../pages/components/Radio'))
const Sliders = lazy(() => import('../../pages/components/Slider'))
const Switches = lazy(() => import('../../pages/components/Switch'))
const Tables = lazy(() => import('../../pages/components/Table'))

export const ComponentsRoutes: (PartialRouteObject & { name: string })[] = [
  {
    name: 'Buttons',
    path: 'buttons',
    element: <Buttons />,
  },
  {
    name: 'Checkbox',
    path: 'checkbox',
    element: <Checkboxes />,
  },
  {
    name: 'Input',
    path: 'input',
    element: <Inputs />,
  },
  {
    name: 'Radio',
    path: 'radio',
    element: <Radios />,
  },
  {
    name: 'Slider',
    path: 'slider',
    element: <Sliders />,
  },
  {
    name: 'Switch',
    path: 'switch',
    element: <Switches />,
  },
  {
    name: 'Table',
    path: 'table',
    element: <Tables />,
  },
]
