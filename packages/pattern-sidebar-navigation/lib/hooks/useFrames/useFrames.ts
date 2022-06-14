import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Frames } from './index'

import type { NavFrame } from './index'
import { useInternalGroupItems } from './types'
import { FramesHookProps, IFramesHookReturn, FrameData } from './internal-types'

export function useFrames({
  navigationItems,
  currentUrl,
  linkComponent,
}: FramesHookProps): Omit<IFramesHookReturn, 'allFrames'> & {
  showHiddenFrame: (triggerId: string) => void
} {
  const fallbackFrameLocation = useRef<[number, number]>([0, 0])
  const { hiddenItems: rawHiddenItems, normalItems: rawNormalItems } =
    useInternalGroupItems(navigationItems)
  const { frames, links, hiddenFrameIdxToTitle, hiddenFrameTriggerToGroupId } =
    useMemo(() => {
      const allFrames: NavFrame[][] = []
      const allLinks = new Map<string, [number, number]>()
      const hiddenFrameIdxToTitle = new Map<number, string>()
      const hiddenFrameTriggerToGroupId = new Map<string, number>()

      const { frames: normalFrames, links: normalLinks } =
        Frames(rawNormalItems)
      // Set Base Items
      allFrames.push(normalFrames)
      Array.from(normalLinks).map(([linkHref, linkFrame]) => {
        allLinks.set(linkHref, [0, linkFrame]) // non hidden group is index 0
      })
      // Set Hidden Items
      rawHiddenItems.forEach((hiddenItem, _frameGroupIdx) => {
        const { frames: hiddenFrames, links: hiddenLinks } = Frames(
          hiddenItem.children,
        )
        const frameGroupIdx = _frameGroupIdx + 1 // non-hidden is index 0
        hiddenFrameIdxToTitle.set(frameGroupIdx, hiddenItem.title)
        if (hiddenItem.triggerId) {
          hiddenFrameTriggerToGroupId.set(hiddenItem.triggerId, frameGroupIdx)
        }
        /// push one array of hidden frames
        allFrames.push(hiddenFrames)
        /// push hidden links
        Array.from(hiddenLinks).map(([linkHref, linkFrame]) => {
          if (allLinks.has(linkHref)) {
            // don't overwrite duplicate urls for hidden items...
            // (if dev) throw new Error("Duplicate Frame URLs")
            return
          }
          allLinks.set(linkHref, [frameGroupIdx, linkFrame])
        })
      })

      return {
        frames: allFrames,
        links: allLinks,
        hiddenFrameIdxToTitle,
        hiddenFrameTriggerToGroupId,
      }
    }, [rawHiddenItems, rawNormalItems])

  const [data, setData] = useState<FrameData>({
    current: [0, 0, frames[0][0]], // [group, number, item]
    shouldAnimate: false,
    animationDirection: 'forwards',
  })

  const framesWithActiveChildren = useMemo(() => {
    const activeChildrenFrames: number[] = []
    let activeFrameData: [number, number] | null = links.has(currentUrl)
      ? ([...(links.get(currentUrl) as [number, number])] as [number, number])
      : null

    while (activeFrameData !== null) {
      const [activeGroupId, activeFrameId] = activeFrameData
      // if it has an active frame parent
      if (
        frames[activeGroupId] &&
        frames[activeGroupId][activeFrameId as number]
      ) {
        const currentFrame = frames[activeGroupId][activeFrameId as number]
        // add this frame to list of frames with currently active members
        activeChildrenFrames.push(activeFrameId)

        if (currentFrame.parent) {
          // set the next frame to the parent of this frame
          activeFrameData[1] = currentFrame.parent
        } else {
          activeFrameData = null
        }
      } else {
        // exit condition
        activeFrameData = null
      }
    }

    return activeChildrenFrames
  }, [data])

  const {
    current: [groupId, frameId, frame],
    shouldAnimate,
    animationDirection,
  } = data

  useLayoutEffect(() => {
    const [correctFrameGroup, correctFrameId] = links.has(currentUrl)
      ? ([...(links.get(currentUrl) as [number, number])] as [number, number])
      : [null, null]

    /**
     * This would mean that we don't have the correct frame
     *
     * This could happen naturally, such as by visiting a specific link in the
     * website that's deeper in the navigation, or by clicking a link on the
     * page that is outside of the current frame's list of links.
     */
    if (
      (correctFrameGroup !== groupId || correctFrameId !== frameId) &&
      typeof correctFrameGroup === 'number' &&
      typeof correctFrameId === 'number'
    ) {
      setData({
        ...data,
        // Don't animate corrections
        shouldAnimate: false,
        // Update the correct frame
        current: [
          correctFrameGroup,
          correctFrameId,
          frames[correctFrameGroup][correctFrameId],
        ],
      })
    } else {
      setData({
        ...data,
        shouldAnimate: true,
      })
    }
  }, [currentUrl])

  useEffect(() => {
    // If we're in the default (non-hidden frameGroup), then we'll record
    // this location and save it to the fallbackFrameLocation.
    // That way, when someone opens a hidden view, when they click 'back',
    // they'll be taken back to this frame – which will automatically
    // preserve where they were
    if (data.current[0] === 0) {
      fallbackFrameLocation.current = [data.current[0], data.current[1]]
    }
  }, [data])

  /// This will only be called to switch between frames that are within the
  /// same groupId. To get out of a groupId, you'll need to specifically switch
  /// to a different url, or use the `handleBackButtonClick` function.
  ///
  /// This function is only used to move down the Frames Tree hierarchy
  const handleChangeFrames = (nextFrameId: number) => () => {
    if (frames[groupId][nextFrameId] === undefined) {
      return
    }

    setData({
      ...data,
      animationDirection: 'forwards',
      shouldAnimate: true,
      current: [groupId, nextFrameId, frames[groupId][nextFrameId]],
    })
  }

  /// This has the ability to change frame groups. If the frame group is
  /// a hidden group (non-zero idx), then it'll automatically forward the
  /// frame to the fallbackUrl (which is always a non-hidden frame).
  const handleBackButtonClick = () => {
    if (frame.parent === null) {
      // If the back button doesn't have a parent to switch to:
      if (groupId === 0) {
        // If we're in the default framegroup (non-hidden)
        // we can't do anything...
        return
      } else {
        // If we're in a hidden frame group, we can back-out to the
        // most-recently visited frame state
        const [gid, fid] = fallbackFrameLocation.current
        setData({
          ...data,
          animationDirection: 'backwards',
          shouldAnimate: true,
          current: [gid, fid, frames[gid][fid]],
        })
      }
    } else {
      // We're able to use default back-button functionality (moving up the
      // current groupId's frame tree)
      setData({
        ...data,
        animationDirection: 'backwards',
        shouldAnimate: true,
        current: [groupId, frame.parent, frames[groupId][frame.parent]],
      })
    }
  }

  const showHiddenFrame = (triggerId: string) => {
    if (!hiddenFrameTriggerToGroupId.has(triggerId)) {
      // TODO: warn in dev that this frame doesn't exist
      return
    }
    const newGroupId = hiddenFrameTriggerToGroupId.get(triggerId) as number
    setData({
      ...data,
      animationDirection: 'forwards',
      shouldAnimate: true,
      current: [newGroupId, 0, frames[newGroupId][0]],
    })
  }

  return {
    linkComponent,
    handleChangeFrames,
    handleBackButtonClick,
    shouldAnimate,
    animationDirection,
    frame:
      groupId === 0 || frameId !== 0
        ? frame
        : {
            ...frame,
            parent: null,
            isHiddenItem: groupId !== 0 && frameId === 0,
            parentItemTitle: hiddenFrameIdxToTitle.get(groupId) as string,
          },
    frameKey: `frame-key-${frameId}`,
    framesWithActiveChildren,
    showHiddenFrame,
  }
}
