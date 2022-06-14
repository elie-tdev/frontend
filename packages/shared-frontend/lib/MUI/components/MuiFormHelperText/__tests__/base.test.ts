import { MuiFormHelperText } from '..'
import { createThemeTest } from '../../../createTheme'

describe('FormHelperText', () => {
  const theme = createThemeTest()
  const component: any = MuiFormHelperText(theme)

  it('should change default element type to "div"', () => {
    expect(component?.defaultProps?.component).toBe('div')
  })

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
