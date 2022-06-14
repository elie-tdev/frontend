import { useMemo } from 'react'
import { useTheme } from '@mui/material'
import type { Theme } from '@mui/material'
import type { SxProps } from '@mui/system/styleFunctionSx'
import { useBreakpoints } from '../../hooks/internal.misc'

export function makeStyles<T extends StyleFunction>(
  styleFn: T,
): (drawerWidth: {
  mobile: number | string
  tablet: number | string
  desktop: number | string
  clipRightDrawer: boolean
}) => ReturnType<typeof styleFn> {
  return (drawerWidth: {
    mobile: number | string
    tablet: number | string
    desktop: number | string
    clipRightDrawer: boolean
  }): ReturnType<typeof styleFn> => {
    const theme = useTheme()
    const breakpoints = useBreakpoints()
    const styles = useMemo(
      () =>
        styleFn(theme, {
          breakpoints,
          drawerWidth: {
            mobile: drawerWidth.mobile,
            tablet: drawerWidth.tablet,
            desktop: drawerWidth.desktop,
          },
          clipRightDrawer: drawerWidth.clipRightDrawer,
        }),
      [theme, styleFn, drawerWidth, breakpoints],
    ) as ReturnType<typeof styleFn>

    return styles
  }
}

export type StyleFunction<
  T extends { [key: string]: SxProps<Theme> } = Record<string, SxProps<Theme>>,
> = T extends { [K in keyof (infer L)]: SxProps<Theme> }
  ? (
      theme: Theme,
      props: {
        breakpoints: ReturnType<typeof useBreakpoints>
        drawerWidth: {
          mobile: number | string
          tablet: number | string
          desktop: number | string
        }
        clipRightDrawer: boolean
      },
    ) => { [K in keyof L]: SxProps<Theme> }
  : never
