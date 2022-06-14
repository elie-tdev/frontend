import React from 'react'

export const setNavChildrenUtilities = (
  children: React.ReactNode,
  setIsOpenTrue: () => void,
) => {
  const elements = React.Children.toArray(children)

  return elements.map(e =>
    React.cloneElement(e as any, { isChildNavItem: true, setIsOpenTrue }),
  )
}
