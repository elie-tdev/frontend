import * as React from 'react'

import { createIcon } from './create-icon'

const RadioEmpty = () => <></>

const RadioChecked = () => (
  <path
    d="M5.33331 13.2911L9.43014 17.3882L18.6666 6.61178"
    stroke="currentColor"
    strokeWidth="1.625"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

interface RadioIcons<T = React.FC<React.SVGAttributes<HTMLOrSVGElement>>> {
  Checked: T
  Empty: T
}

export const RadioIcon: RadioIcons = {
  Checked: createIcon(RadioChecked, 'radio'),
  Empty: createIcon(RadioEmpty, 'radio'),
}
