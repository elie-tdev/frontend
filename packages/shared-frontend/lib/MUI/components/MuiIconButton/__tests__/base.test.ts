import { MuiIconButton } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Icon Button', () => {
  const theme = createThemeTest()
  const component = MuiIconButton(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
