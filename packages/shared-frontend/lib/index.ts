// Create theme (main export)
import { createTheme } from './MUI'
// Make styles utility
import { makeStyles } from './utils'
// Helper types
import type { StyleFunction } from './utils'
import type { BAIThemeOptions } from './MUI'

export { createTheme, makeStyles }
export type { BAIThemeOptions, StyleFunction }
// TODO: may want to remove this default export, because it causes issues in some esm builds?
export default createTheme
