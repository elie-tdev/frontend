import { makeStyles } from '../make-styles'
import type { Theme } from '@mui/material'

// Because hooks don't work without a react context
jest.mock('react', () => {
  const useMemo = (fn: any, _deps: any) => fn()
  return {
    useMemo,
  }
})

// because useTheme won't work without react context
jest.mock('@mui/material', () => {
  const useTheme = (): Theme =>
    ({
      palette: {
        error: {
          main: 'red',
        },
      },
      typography: {
        fontSize: 16,
      },
    } as any as Theme)

  return {
    useTheme,
  }
})

describe('makeStyles', () => {
  const base_styles = {
    color: 'blue',
    fontSize: 12,
  }

  const useStyles = makeStyles(theme => ({
    header: {
      color: 'blue',
      fontSize: 12,
    },
    body: {
      color: theme.palette.error.main,
      fontSize: theme.typography.fontSize,
    },
  }))

  const useStylesNested = makeStyles(() => ({
    '& > span': {
      color: 'blue',
    },
  }))

  it('Should have correct types', () => {
    const styles = useStyles()
    const stylesNested = useStylesNested()
    //
    // make sure this test fails with a type error if
    // type inference is wrong by explicitly typing out
    // what the inferred keys should be
    //
    const keys: (keyof typeof styles)[] = ['header', 'body']
    const keysNested: (keyof typeof stylesNested)[] = ['& > span']

    expect(Object.keys(styles).includes(keys[0])).toBeTruthy()
    expect(Object.keys(styles).includes(keys[1])).toBeTruthy()
    expect(Object.keys(styles).length == 2).toBeTruthy()
    expect(Object.keys(stylesNested).includes(keysNested[0])).toBeTruthy()
    expect(Object.keys(stylesNested).length == 1).toBeTruthy()
  })

  it('Should accurately pull explicit values and transfer them exactly', () => {
    const styles = useStyles()
    expect(styles.header.color == base_styles.color).toBeTruthy()
    expect(styles.header.fontSize == base_styles.fontSize).toBeTruthy()
  })

  it('Should accurately pull theme values', () => {
    const styles = useStyles()
    expect(styles.body.color == 'red').toBeTruthy()
    expect(styles.body.fontSize == 16).toBeTruthy()
  })
})
