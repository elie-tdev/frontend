import { createThemeTest } from '../../../createTheme'
import ifLight from '../../../utils/if-mode'
import text from '../text'

describe('Text Button', () => {
  const theme = createThemeTest()
  const textButton = text(theme)

  it.each`
    key            | background
    ${'primary'}   | ${theme.palette.primary}
    ${'secondary'} | ${theme.palette.secondary}
    ${'success'}   | ${theme.palette.success}
    ${'error'}     | ${theme.palette.error}
    ${'warning'}   | ${theme.palette.warning}
    ${'info'}      | ${theme.palette.info}
  `(
    'should create styles for $key color',
    ({
      key,
      background,
    }: {
      key: string
      background: { main: string; dark: string; light: string }
    }) => {
      const variant = textButton.find(v => v.props.color === key)
      const textColor = (variant?.style as any)['&:hover'].color
      expect(textColor).toEqual(
        ifLight(
          _ => background.dark,
          _ => background.light,
          theme,
        ),
      )
      expect(variant).toMatchSnapshot()
    },
  )
})
