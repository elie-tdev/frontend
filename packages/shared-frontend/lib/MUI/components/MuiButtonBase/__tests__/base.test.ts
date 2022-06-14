import { MuiButtonBase } from '../'
import { createThemeTest } from '../../../createTheme'

describe('ButtonBase', () => {
  const theme = createThemeTest()
  const component = MuiButtonBase(theme)
  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
