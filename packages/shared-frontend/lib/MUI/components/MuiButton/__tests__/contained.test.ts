import { createThemeTest } from '../../../createTheme'
import contained from '../contained'

describe('Contained Button', () => {
  const theme = createThemeTest()
  const containedButton = contained(theme)

  it.each`
    key            | background
    ${'primary'}   | ${theme.palette.primary.main}
    ${'secondary'} | ${theme.palette.secondary.main}
    ${'success'}   | ${theme.palette.success.main}
    ${'error'}     | ${theme.palette.error.main}
    ${'warning'}   | ${theme.palette.warning.main}
    ${'info'}      | ${theme.palette.info.main}
  `(
    'should create styles for $key color',
    ({ key, background }: { key: string; background: string }) => {
      const variant = containedButton.find(v => v.props.color === key)
      const bgColor = (variant?.style as any).backgroundColor
      expect(bgColor).toEqual(background)
      expect(variant).toMatchSnapshot()
    },
  )
})
