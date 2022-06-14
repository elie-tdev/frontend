import { MuiSwitch } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Switch', () => {
  const theme = createThemeTest()
  const component = MuiSwitch(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
