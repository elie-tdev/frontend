import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { NavItemChildProps } from '../../components/NavItem/types'

export function useCollapsableChildren(
  props?: Omit<NavItemChildProps, 'title'> & { setIsOpenTrue?: () => void },
): {
  open: boolean
  setOpen: () => void
  enterTransition: boolean
  hasActiveChild: boolean
  handleClick: (e: React.MouseEvent) => void
  currentIsActive: boolean
  childProps: any
} {
  const [open, setOpen] = useState<boolean>(false)
  const [enterTransition, setEnterTransition] = useState<boolean>(true)
  const [manuallyChanged, setManuallyChanged] = useState<boolean>(false)
  const [hasActiveChild, setHasActiveChild] = useState<boolean>(false)

  const {
    isActive: currentIsActive,
    setIsOpenTrue: parentSetOpenTrue,
    ...childProps
  } = {
    isActive: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOpenTrue: () => {},
    ...props,
  }

  /**
   * This will tell the parent list item to be open by default,
   * so that the active element (this element) can be visible.
   *
   * This will only run once, conditionally upon this element being active.
   */
  useEffect(() => {
    if (currentIsActive) {
      parentSetOpenTrue()
    }
  }, [])

  /**
   * This will be called by child elements that have the prop 'isActive' set to true. This allows the component's first render to appear (if it has an active element within it) as if it's already open.
   */
  const setOpenTrue = useCallback(() => {
    // Make sure the user hasn't already interacted with the element.
    // we don't want to cause odd animation
    // side-effects if that's happened already
    if (!open && !manuallyChanged) {
      // Make sure we don't run an animation on first render
      setEnterTransition(false)
      // Note that we have an active element as a child
      setHasActiveChild(true)
      // Change the collapsed state
      parentSetOpenTrue() // make sure parent is open
      setOpen(true) // make sure this element is open
    }
  }, [open, manuallyChanged])

  /**
   * Cleanup for the function setOpenTrue:
   *
   * Restores collapse animation on enter when user clicks the element
   */
  useLayoutEffect(() => {
    // If a child element has set open===true and successfully turned
    // the enter transition off, we'll need to manually set the
    // enter transition
    if (!enterTransition && open === true && hasActiveChild) {
      setEnterTransition(true)
    }
  }, [enterTransition, open])

  /**
   * Run when a user clicks on the list item with children
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Make sure we prevent child elements from changing animation behavior
    // in the future after the user interacts with the element
    setManuallyChanged(true)
    // Toggle the element's 'collapsed' state
    setOpen(!open)
  }

  return {
    open,
    setOpen: setOpenTrue,
    enterTransition,
    hasActiveChild,
    handleClick,
    currentIsActive,
    childProps,
  }
}
