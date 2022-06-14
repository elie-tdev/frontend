import { MuiCheckbox } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Checkbox', () => {
  const theme = createThemeTest()
  const component = MuiCheckbox(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
