import { makeInternalMixins } from './mixins'

export type InternalMixins = ReturnType<typeof makeInternalMixins>

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    _BAI_internal: InternalMixins
  }
}
