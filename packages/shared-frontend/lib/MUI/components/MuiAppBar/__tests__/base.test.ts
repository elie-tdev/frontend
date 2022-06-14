import { MuiAppBar } from '../'
import { createThemeTest } from '../../../createTheme'

describe('AppBar', () => {
  const theme = createThemeTest()
  const appBar = MuiAppBar(theme)
  it('should be consistent with previous versions: ', () => {
    expect(appBar).toMatchSnapshot()
  })
})
