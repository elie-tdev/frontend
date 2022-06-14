import type { LinkComponent } from 'design-system/pattern-utils'
import { NavFrame, NavItemArray } from './types'

export type HandleChangeFramesFn = (nextFrameId: number) => () => void
export type HandleChangeGlobalFn = (nextFrameId: number | string) => () => void

export interface IFramesHookReturn {
  linkComponent: 'a'
  handleChangeFrames: HandleChangeFramesFn
  handleBackButtonClick: () => void
  shouldAnimate: boolean
  animationDirection: 'forwards' | 'backwards'
  frame: NavFrame
  frameKey: string
  framesWithActiveChildren: number[]
  allFrames: NavFrame[]
}

export interface FramesHookProps {
  navigationItems: NavItemArray
  currentUrl: string
  linkComponent: LinkComponent
}

export interface IMainFramesHookReturn extends IFramesHookReturn {
  handleChangeFrames: HandleChangeGlobalFn
}

export type FrameData = {
  current: [frameGroup: number, frameId: number, frame: NavFrame]
  shouldAnimate: boolean
  animationDirection: 'forwards' | 'backwards'
}
