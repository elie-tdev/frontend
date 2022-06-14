import { MuiSlider } from '../'
import { createThemeTest } from '../../../createTheme'

describe('Slider', () => {
  const theme = createThemeTest()
  const component = MuiSlider(theme)

  it('should be consistent with previous versions: ', () => {
    expect(component).toMatchSnapshot()
  })
})
