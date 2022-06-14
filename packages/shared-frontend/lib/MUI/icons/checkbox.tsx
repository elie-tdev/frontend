import * as React from 'react'

import { createIcon } from './create-icon'

const CheckboxEmpty = () => <></>

const CheckboxIndeterminate = () => (
  <path
    d="M5.33331 11.1875C4.88458 11.1875 4.52081 11.5513 4.52081 12C4.52081 12.4487 4.88458 12.8125 5.33331 12.8125V11.1875ZM18.6666 12.8125C19.1154 12.8125 19.4791 12.4487 19.4791 12C19.4791 11.5513 19.1154 11.1875 18.6666 11.1875V12.8125ZM5.33331 12.8125H18.6666V11.1875H5.33331V12.8125Z"
    fill="currentColor"
  />
)

const CheckboxChecked = () => (
  <path
    d="M5.33331 13.2911L9.43014 17.3882L18.6666 6.61178"
    stroke="currentColor"
    strokeWidth="1.625"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

interface CheckboxIcons<T = React.FC<React.SVGAttributes<HTMLOrSVGElement>>> {
  Checked: T
  Empty: T
  Indeterminate: T
}

export const CheckboxIcon: CheckboxIcons = {
  Checked: createIcon(CheckboxChecked, 'checkbox'),
  Empty: createIcon(CheckboxEmpty, 'checkbox'),
  Indeterminate: createIcon(CheckboxIndeterminate, 'checkbox'),
}
