import { MuiTextField } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Text Field', () => {
  const theme = createThemeTest()
  const component = MuiTextField(theme)

  it('should change default to filled: ', () => {
    expect(component?.defaultProps?.variant).toBe('filled')
  })

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
