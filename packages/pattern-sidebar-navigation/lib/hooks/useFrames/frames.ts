import {
  BaseItemLink,
  isLinkItem,
  NavFrame,
  NavFrameItem,
  NavFrameLink,
  NavItemArray,
} from './types'

export function createNavigationFrames(originalNavItemArr: NavItemArray) {
  const navFrames: (NavFrame | null)[] = []
  const linksToFrames = new Map<string, number>()

  function processIntoFrames(
    allItems: NavItemArray,
    parentItemIdx: number | null = null,
    parentItemTitle: string | null = null,
  ) {
    const currentFrameItems: NavFrameItem[] = []
    navFrames.push(null)
    const navFrameNumber: number = navFrames.length - 1

    const addToFrame = (
      items: NavItemArray,
      childItems: null | (BaseItemLink | NavFrameLink)[] = null,
    ) => {
      if (childItems === null) {
        items.forEach(item => {
          if (isLinkItem(item)) {
            currentFrameItems.push(item)
            linksToFrames.set(item.href, navFrameNumber)
          } else if ((item as any).forceNewFrame) {
            // FORCING this element's children into a new frame
            // even though it's not required

            // Item is a parent, but we have to give it it's own frame
            // the children for that frame, and the title of it's parent
            const { title, children } = item
            // we'll store that frame's index, so when clicked, we can find
            // the next frame to display
            const childIndex = processIntoFrames(
              children,
              navFrameNumber,
              title,
            )
            // We're just going to push the title, and the index of the next frame
            currentFrameItems.push({
              ...item,
              title,
              nextItem: childIndex,
            })
          } else {
            const children: (BaseItemLink | NavFrameLink)[] = []
            // add items to children arr
            addToFrame(item.children, children)

            // add this item to current frame
            currentFrameItems.push({ ...item, children })
          }
        })
      } else {
        items.forEach(item => {
          if (isLinkItem(item)) {
            childItems.push(item)
            linksToFrames.set(item.href, navFrameNumber)
          } else {
            // Item is a parent, but we have to give it it's own frame
            // the children for that frame, and the title of it's parent
            const { title, children } = item
            // we'll store that frame's index, so when clicked, we can find
            // the next frame to display
            const childIndex = processIntoFrames(
              children,
              navFrameNumber,
              title,
            )
            // We're just going to push the title, and the index of the next frame
            childItems.push({
              ...item,
              title,
              nextItem: childIndex,
            })
          }
        })
      }
    }

    addToFrame(allItems)

    navFrames[navFrameNumber] = {
      parent: parentItemIdx,
      parentItemTitle,
      items: currentFrameItems,
    }

    return navFrameNumber
  }

  processIntoFrames(originalNavItemArr)

  return {
    frames: navFrames as NavFrame[],
    links: linksToFrames,
  }
}
