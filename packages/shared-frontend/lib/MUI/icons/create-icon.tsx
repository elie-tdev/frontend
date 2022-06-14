import * as React from 'react'

import { capitalize } from '@mui/material'

export const createIcon =
  (
    Path: () => JSX.Element,
    componentName: string,
  ): React.FC<React.SVGAttributes<HTMLOrSVGElement>> =>
  props => {
    const sizeName = (props.fontSize as string) || ('normal' as string)
    const size: [string, any] =
      sizeName === 'small'
        ? ['16px', { margin: '2px' }]
        : ['18px', { margin: '1px' }]
    return (
      <span
        className={`BAI${capitalize(componentName)}-size${capitalize(
          sizeName,
        )} BAI${capitalize(componentName)}-wrapper`}
        style={{ display: 'inline-flex', ...size[1] }}
      >
        <svg
          width={size[0]}
          height={size[0]}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path />
        </svg>
      </span>
    )
  }
