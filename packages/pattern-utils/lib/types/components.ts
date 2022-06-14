import React from 'react'
import type { Theme } from '@mui/material'
import type { SxProps } from '@mui/system'

/**
 * # Component
 *
 * This is a ReactNode prop. It's similar to how you pass an
 * already-rendered prop to React's `Suspense` component.
 */
export type ComponentProp = NonNullable<React.ReactNode>

/**
 * # SX Props
 *
 * This property is eqivalent to a `@mui/material` component's `sx` prop.
 */
export type SxProp = SxProps<Theme>

/**
 * # Link Component
 *
 * A Link component that is compatible with the NavigationPanel
 * component to be used as it's `linkComponent` prop.
 *
 * @see {@link createLinkComponent}
 */
export type LinkComponent<D extends React.ElementType = 'a'> = D

/**
 * # Create Link Component
 *
 * A function that helps turn Router-specific link components into
 * something that the NavPanel can use. This is mostly a type helper.
 *
 * The component should behave like a normal 'anchor' element (taking in
 * an href prop, etc).
 *
 * ## Example
 *
 * ```tsx
 * import React from 'react'
 * import { Link } from 'react-router-dom'
 *
 * import { createLinkComponent } from 'design-system/pattern-sidebar-navigation' // (or another pattern that exports it)
 *
 *  //
 *  // @abstract This component makes the default link from
 *  // React Router Dom act like a normal anchor tag.
 *  //
 *  export const WrappedLink = createLinkComponent<HTMLAnchorElement>(
 *   (props, ref) => {
 *     return <Link to={props.href} ref={ref} {...props} />
 *   },
 * )
 * ```
 */
export function createLinkComponent<
  T extends 'a' | HTMLAnchorElement = 'a',
  P extends { href: string } = { href: string },
>(renderFn: React.ForwardRefRenderFunction<T, P>) {
  const component = React.forwardRef(renderFn)
  return toLinkComponent(component)
}

const toLinkComponent = <
  T,
  P,
  L = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  >,
>(
  t: L,
) => t as unknown as LinkComponent
