import { useEffect, useMemo, useState } from 'react'

import { Frames } from './index'

import type { NavFrame } from './index'
import { FramesHookProps, IFramesHookReturn } from './internal-types'

export function useHierarchicalFrames({
  navigationItems,
  currentUrl,
  linkComponent,
}: FramesHookProps): IFramesHookReturn {
  const { frames, links } = useMemo(
    () => Frames(navigationItems),
    [navigationItems],
  )

  type FrameData = {
    current: [frameId: number, frame: NavFrame]
    shouldAnimate: boolean
    animationDirection: 'forwards' | 'backwards'
  }

  const [data, setData] = useState<FrameData>({
    current: [0, frames[0]],
    shouldAnimate: false,
    animationDirection: 'forwards',
  })

  const framesWithActiveChildren = useMemo(() => {
    const activeChildrenFrames = []
    let activeFrameId: number | null = links.get(currentUrl) ?? null

    while (activeFrameId !== null) {
      // if it has an active frame parent
      if (frames[activeFrameId as number]) {
        // add this frame to list of frames with currently active members
        activeChildrenFrames.push(activeFrameId)

        if (frames[activeFrameId as number].parent) {
          // set the next frame to the parent of this frame
          activeFrameId = frames[activeFrameId].parent
        } else {
          activeFrameId = null
        }
      } else {
        // exit condition
        activeFrameId = null
      }
    }

    return activeChildrenFrames
  }, [data])

  const {
    current: [frameId, frame],
    shouldAnimate,
    animationDirection,
  } = data

  useEffect(() => {
    const correctFrame = links.get(currentUrl)
    /**
     * This would mean that we don't have the correct frame
     *
     * This could happen naturally, such as by visiting a specific link in the
     * website that's deeper in the navigation, or by clicking a link on the
     * page that is outside of the current frame's list of links.
     */
    if (correctFrame !== frameId && typeof correctFrame === 'number') {
      setData({
        ...data,
        // Don't animate corrections
        shouldAnimate: false,
        // Update the correct frame
        current: [correctFrame, frames[correctFrame]],
      })
    } else {
      setData({
        ...data,
        shouldAnimate: true,
      })
    }
  }, [currentUrl])

  const handleChangeFrames = (nextFrameId: number) => () => {
    if (frames[nextFrameId] === undefined) return

    setData({
      ...data,
      animationDirection: 'forwards',
      shouldAnimate: true,
      current: [nextFrameId, frames[nextFrameId]],
    })
  }

  const handleBackButtonClick = () => {
    if (frame.parent === null) return

    setData({
      ...data,
      animationDirection: 'backwards',
      shouldAnimate: true,
      current: [frame.parent, frames[frame.parent]],
    })
  }

  return {
    linkComponent,
    handleChangeFrames,
    handleBackButtonClick,
    shouldAnimate,
    animationDirection,
    frame,
    frameKey: `frame-key-${frameId}`,
    framesWithActiveChildren,
    allFrames: frames,
  }
}
