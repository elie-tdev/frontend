import { useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material'

export type BreakpointDevice = 'desktop' | 'tablet' | 'mobile'
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export function useBreakpoints(): [bp: Breakpoint, device: BreakpointDevice] {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.only('sm'))
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'))
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'))
  const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.only('xl'))

  return isXs
    ? ['xs', 'mobile']
    : isSm
    ? ['sm', 'tablet']
    : isMd
    ? ['md', 'desktop']
    : isLg
    ? ['lg', 'desktop']
    : isXl
    ? ['xl', 'desktop']
    : ['xl', 'desktop']
}
