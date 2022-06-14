import { MuiRadio } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Radio', () => {
  const theme = createThemeTest()
  const component = MuiRadio(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
