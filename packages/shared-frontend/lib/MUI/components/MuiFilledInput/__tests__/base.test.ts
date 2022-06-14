import { MuiFilledInput } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Checkbox', () => {
  const theme = createThemeTest()
  const component = MuiFilledInput(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
