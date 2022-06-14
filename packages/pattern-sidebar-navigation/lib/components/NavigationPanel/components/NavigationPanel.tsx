import React, { useCallback, useMemo } from 'react'
import { TransitionGroup } from 'react-transition-group'

import { Box, Slide, useTheme } from '@mui/material'

import { useFrames } from '../../..'
import { ExternalNavigationContext, NavPanelContext } from '../context'
import { InternalNavigationImpl } from './InternalNavigationImpl'

import type { NavItemArray } from '../../..'
import type {
  ComponentProp,
  SxProp,
  LinkComponent,
} from 'design-system/pattern-utils'

/**
 * Props for the main Navigation Panel component
 *
 * _See the [getting started docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/getting-started.md)
 * to learn more._
 */
export interface NavigationPanelProps {
  /**
   * # Navigation Panel Items
   *
   * In instance of {@link NavItemArray} that the NavigationPanel can use
   * for rendering.
   */
  items: NavItemArray
  /**
   * # Current URL
   *
   * The current url of the application. This helps the
   * component determine which 'Frame' it should display (on initial render
   * and on subsequent renders). The component expects that this property
   * will change frequently depending on the App's current location.
   */
  currentUrl: string
  /**
   * # Link Component
   *
   * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
   * to learn more._
   *
   * The component that the NavigationPanel should use to
   * display links. This component should basically be 'style-less'. When
   * using react-router, this should basically be a 'Link'.
   *
   * See the `createLinkComponent` function for examples of how to wrap
   * react-router's `Link`, or other router's link components.
   */
  linkComponent: LinkComponent
  /**
   * # Show Test IDs
   *
   * _See the [testing docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
   * to learn more._
   *
   * Whether or not the component should display test-id's. This is
   * useful for development and testing, but should probably be disabled
   * during production.
   */
  showTestIds?: boolean
  /**
   * # Custom Component Slots
   *
   * Custom component 'slots' that will be rendered by the NavigationPanel.
   */
  components?: {
    /**
     * # Top Item Node
     *
     * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
     * to learn more._
     *
     * A ReactNode that will _always_ be displayed above the
     * NavigationPanel's main content.
     */
    topItem?: ComponentProp
    /**
     * # Top Item (home only) Node
     *
     * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
     * to learn more._
     *
     * A ReactNode that will be displayed above the NavigationPanel's
     * main content _only when_ the top-level panel is visible (the
     * homepage panel, or the very-top-level panel).
     */
    topItemHome?: ComponentProp
    /**
     * # Bottom Items Node
     *
     * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
     * to learn more._
     *
     * A ReactNode that will always be displayed at the bottom of the
     * NavigationPanel.
     */
    bottomItems?: ComponentProp
  }
  /**
   * # Background Color
   *
   * ## This helps us hide portions scroll areas
   *
   * The background color for the NavigationPanel. This is needed
   * to be able to implement scrolling areas for the main list inside
   * of the NavigationPanel. If left empty, this will default to the
   * current MUI theme's default background color.
   */
  backgroundColor?: string
  /**
   * # Style Props (SxProps)
   *
   * Style the elements within the `NavigationPanel`, including
   * deeply-nested components, using normal `@mui` style-object syntax.
   */
  sx?: SxProp
}

const defaultComponents: NavigationPanelProps['components'] = {
  topItem: undefined,
  topItemHome: undefined,
  bottomItems: undefined,
}

/**
 * # Navigation Panel
 *
 * _See the [getting started docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/getting-started.md)
 * to learn more._
 *
 * A high-level abstraction to handle dynamic sidebar navigation throughout
 * an application. It has been designed and developed by the BAI XD team for
 * a few distinct reasons:
 *
 * 1. Show an example of how a very deely-nested navigation can be made to
 *  be simple, user-friendly, and conformant to the principles of the BAI DS.
 * 2. Create a working library that allows other BAI frontend teams to use
 *  this pattern when working with `MUI` and `shared-frontend`.
 * 3. Provide an opinionated abstraction of a single sidebar navigation that
 * can be used at the top level of an application.
 *
 * This component is not a full application-shell or wrapper, it is merely
 * a full-height sidebar. It provides a place to put custom items above
 * and below the main navigation (like a logo, or settings link) so that
 * it can be customized for different applications and layouts.
 *
 * @param props - an object that implements NavigationPanelProps
 * @returns ReactNode
 */
export function NavigationPanel({
  items: navigation_items,
  currentUrl: current_url,
  linkComponent: link_component,
  components = defaultComponents,
  showTestIds = false,
  sx = {},
  backgroundColor: background_color_default,
}: NavigationPanelProps) {
  const {
    animationDirection,
    frame,
    frameKey,
    handleBackButtonClick,
    handleChangeFrames,
    linkComponent,
    shouldAnimate,
    framesWithActiveChildren,
    showHiddenFrame,
  } = useFrames({
    currentUrl: current_url,
    linkComponent: link_component,
    navigationItems: navigation_items,
  })

  const { topItem, bottomItems } = useMemo(
    () => ({ ...defaultComponents, ...components }),
    [components],
  )

  const theme = useTheme()
  const backgroundColor =
    background_color_default ?? theme.palette.background.default

  const checkIsActive = useCallback(
    (href: string) => href === current_url,
    [current_url],
  )

  const navPanel = useMemo(() => {
    const transitionTime = theme.transitions.duration.standard
    return (
      <Slide
        direction={animationDirection === 'forwards' ? 'left' : 'right'}
        key={frameKey}
        exit={shouldAnimate}
        enter={shouldAnimate}
        timeout={transitionTime}
        appear={true}
        onEnter={node => {
          node.style.opacity = '0'
          node.style.transition =
            node.style.transition + `, opacity ${transitionTime}ms linear`
          node.style.opacity = '1'
        }}
        onExit={node => {
          node.style.opacity = '1'
          node.style.transform = 'none'
          node.style.transition = `opacity ${transitionTime}ms linear`
          node.style.opacity = '0'
        }}
        onExiting={node => {
          node.style.transform = 'none'
          node.style.transition = `opacity ${transitionTime}ms linear`
          node.style.opacity = '0'
        }}
        onExited={node => {
          node.style.transform = 'none'
          node.style.transition = `opacity ${transitionTime}ms linear`
          node.style.opacity = '0'
        }}
      >
        <InternalNavigationImpl
          {...frame}
          backgroundColor={backgroundColor}
          showTestIds={showTestIds}
          handleBackButtonClick={handleBackButtonClick}
          handleChangeFrames={handleChangeFrames}
          isHiddenItem={frame.isHiddenItem ?? false}
          topItemHomeComponent={
            frame.parent === null ? components?.topItemHome : undefined
          }
          linkComponent={linkComponent}
          frameKey={frameKey}
        />
      </Slide>
    )
  }, [frame, backgroundColor])

  return (
    <ExternalNavigationContext.Provider
      value={{ parentFrame: frame.parentItemTitle, showHiddenFrame }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          contain: 'strict',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: backgroundColor,
          ...sx,
        }}
      >
        {!!topItem && topItem}
        <Box
          sx={{
            position: 'relative',
            contain: 'strict',
            flexGrow: 1,
            overflow: 'auto',
            overflowX: 'hidden',
            display: 'block',
          }}
        >
          <NavPanelContext.Provider
            value={{ checkIsActive, framesWithActiveChildren }}
          >
            <TransitionGroup>{navPanel}</TransitionGroup>
          </NavPanelContext.Provider>
        </Box>
        <Box>{bottomItems}</Box>
      </Box>
    </ExternalNavigationContext.Provider>
  )
}
