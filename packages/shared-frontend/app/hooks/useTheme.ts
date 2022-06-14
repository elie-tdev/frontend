import { useContext } from 'react'

import ThemeContext from '../context/theme'

export default function useTheme() {
  const data = useContext(ThemeContext)
  return data
}
