import { useMemo } from 'react'
import { useTheme } from '@mui/material'
import type { Theme } from '@mui/material'
import type { SxProps } from '@mui/system/styleFunctionSx'

/**
 * # Make Styles
 *
 * Utility to bring the `makeStyles` design pattern back to MUI v5, with
 * some slight differences.
 *
 * ## Caveats
 *
 * - No prop injection supported (just use `sx` inline for this case)
 * - Must use with `sx` prop instead of `classes` prop
 *
 * example:
 * ```tsx
 * const useStyles = makeStyles(theme => ({
 *   header: { fontSize: 16 },
 *   body: {
 *     fontSize: 14,
 *     '& > .error': {
 *         color: theme.palette.error.main
 *     }
 *   }
 * }))
 *
 * function SomeComponent() {
 *   const styles = useStyles();
 *
 *   return ([
 *      <Box sx={styles.header} component="header"/>,
 *      <Box sx={styles.body} component="main" />,
 *   ])
 * }
 * ```
 */
export function makeStyles<T extends StyleFunction>(
  styleFn: T,
): () => ReturnType<typeof styleFn> {
  return (): ReturnType<typeof styleFn> => {
    const theme = useTheme()

    const styles = useMemo(
      () => styleFn(theme),
      [theme, styleFn],
    ) as ReturnType<typeof styleFn>

    return styles
  }
}

export type StyleFunction<
  T extends { [key: string]: SxProps<Theme> } = Record<string, SxProps<Theme>>,
> = T extends { [K in keyof (infer L)]: SxProps<Theme> }
  ? (theme: Theme) => { [K in keyof L]: SxProps<Theme> }
  : never
