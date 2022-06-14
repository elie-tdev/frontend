import { MuiPaper } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Paper', () => {
  const theme = createThemeTest()
  const component = MuiPaper(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
