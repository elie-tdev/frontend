import { MuiInputLabel } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Input Label', () => {
  const theme = createThemeTest()
  const component = MuiInputLabel(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
