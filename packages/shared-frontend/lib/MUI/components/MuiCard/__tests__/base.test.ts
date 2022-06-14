import { MuiCard } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Card', () => {
  const theme = createThemeTest()
  const component = MuiCard(theme)
  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
