import React, { ReactElement } from 'react'

import { Toolbar, ToolbarProps } from '@mui/material'

interface TopLevelItemProps {
  variant?: ToolbarProps['variant']
}

export function TopLevelItem({
  variant = 'regular',
}: TopLevelItemProps): ReactElement {
  return <Toolbar disableGutters variant={variant} />
}
