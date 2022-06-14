import { MuiButtonGroup } from '../'
import { createThemeTest } from '../../../createTheme'

describe('ButtonGroup', () => {
  const theme = createThemeTest()
  const component = MuiButtonGroup(theme)
  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
