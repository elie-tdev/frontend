import type { ReactNode } from 'react'
import type {
  NavigationPanelProps,
  NavItemArray,
} from 'design-system/pattern-sidebar-navigation'
import type {
  ComponentProp,
  LinkComponent,
  SxProp,
} from 'design-system/pattern-utils'

export interface AppShellProps {
  /**
   * @description If loading this in a shadow-dom or an IFrame, it's best to set this variable to the current window(global), so that the mobile drawer is able to detect size/width changes correctly.
   */
  container?: HTMLElement
  /**
   * # Sidebar drawer width
   *
   * The drawer width of the left sidebar, which is set by an
   * object containing options for each distinct screen width
   */
  sidebarDrawerWidth?: {
    /** The width of the sidebar drawer on mobile */
    mobile?: string | number
    /** The width of the sidebar drawer on tablets */
    tablet?: string | number
    /** The width of the sidebar drawer on desktop */
    desktop?: string | number
  }
  /**
   * # Navigation Panel Items
   *
   * In instance of {@link NavItemArray} that the NavigationPanel can use
   * for rendering.
   */
  sidebarItems: NavItemArray
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
   * @description Components to render within the app shell.
   */
  components?: AppShellComponentProps
  /**
   * @description Whether or not to use dynamic sidebar for mobile/desktop
   */
  testingEnvironment?: boolean
  /**
   * # Clip right drawer
   *
   * Should we place the right drawer underneath the AppBar?
   */
  clipRightDrawer?: boolean
  /**
   * # Background Color
   *
   * ## This helps us hide portions scroll areas
   *
   * The background color for the NavigationPanel and drawers. This
   * is needed to be able to implement scrolling areas for the main
   * list inside of the NavigationPanel. If left empty, this will
   * default to the current MUI theme's default background color.
   */
  backgroundColor?: string
  /**
   * # Style Props (SxProps)
   *
   * Style the elements within the `AppShell`
   */
  sxProps?: {
    /**
     * Styles for the main AppShell wrapper
     */
    wrapper?: SxProp
    /**
     * Styles for the main AppBar
     */
    appBar?: SxProp
    /**
     * Styles for the main AppShell-AppBar Toolbar
     */
    appbarToolbar?: SxProp
    /**
     * Styles for the main Appshell-Appbar Menu IconButton
     */
    appbarMenuButton?: SxProp
    /**
     * Styles for the main AppShell Menu Icon (tablet)
     */
    appbarMenuIcon?: SxProp
    /**
     * Styles for the main AppShell NavWrapper
     */
    navWrapper?: SxProp
    /**
     * Styles for the main AppShell Navigation Drawer (on Tablet)
     */
    navDrawerTablet?: SxProp
    /**
     * Styles for the main AppShell Navigation Drawer (on Desktop)
     */
    navDrawerDesktop?: SxProp
    /**
     * Styles for the main content area within the AppShell
     */
    content?: SxProp
    /**
     *  Styles for the Right Panl Drawer
     */
    rightPanelDrawer?: SxProp
    /**
     * Styles for the main AppShell's NavigationPanel (left sidebar)
     */
    sidebarFrameWrapper?: SxProp
    /**
     * Styles for the wrapper 'ul' around all items
     */
    sidebarFrameListL1?: SxProp
    /**
     * Styles for the wrapper 'ul' around child item list
     */
    sidebarFrameListL2?: SxProp
    /**
     * Styles for the main parent item wrapper
     */
    sidebarItemL1?: SxProp
    /**
     * Styles for the button/link within a parent item
     */
    sidebarItemButtonL1?: SxProp
    /**
     * Styles for the wrapper text around a parent item
     */
    sidebarItemTextWrapperL1?: SxProp
    /**
     * Styles for the main `Typography` component within a parent item
     */
    sidebarItemTypographyL1?: SxProp
    /**
     * Styles for the `startIcon` for within a parent item
     */
    sidebarItemIconStartL1?: SxProp
    /**
     * Styles for the `endIcon` for within a parent item
     */
    sidebarItemIconEndL1?: SxProp
    /**
     * Styles for the `startIcon`'s SVG for within a parent item
     */
    sidebarItemIconSvgL1?: SxProp
    /**
     * Styles for the span that only wrapps a text node in a parent item
     */
    sidebarItemTypographyInnerL1?: SxProp
    /**
     * Styles for the main child item wrapper
     */
    sidebarItemL2?: SxProp
    /**
     * Styles for the button/link within a child item
     */
    sidebarItemButtonL2?: SxProp
    /**
     * Styles for the wrapper text around a child item
     */
    sidebarItemTextWrapperL2?: SxProp
    /**
     * Styles for the main `Typography` component within a child item
     */
    sidebarItemTypographyL2?: SxProp
    /**
     * Styles for the `startIcon` for within a child item
     */
    sidebarItemIconStartL2?: SxProp
    /**
     * Styles for the `endIcon` for within a child item
     */
    sidebarItemIconEndL2?: SxProp
    /**
     * Styles for the `startIcon`'s SVG for within a child item
     */
    sidebarItemIconSvgL2?: SxProp
    /**
     * Styles for the span that only wrapps a text node in a child item
     */
    sidebarItemTypographyInnerL2?: SxProp
  }
}

export interface AppShellDeferredComponentProps {
  sidebar?: NavigationPanelProps
}

export interface AppShellComponentProps {
  /**
   * @description The topbar content you'd like to use
   */
  appbarContents?: NonNullable<ReactNode> | null
  /**
   * # Sidebar Top Item Node
   *
   * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
   * to learn more._
   *
   * A ReactNode that will _always_ be displayed above the
   * sidebar's main content.
   */
  sidebarTopItem?: ComponentProp

  /**
   * # Sidebar Top Item (home only) Node
   *
   * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
   * to learn more._
   *
   * A ReactNode that will be displayed above the NavigationPanel's
   * main content _only when_ the top-level panel is visible (the
   * homepage panel, or the very-top-level panel).
   */
  sidebarTopItemHome?: ComponentProp
  /**
   * # Sidebar Bottom Items Node
   *
   * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
   * to learn more._
   *
   * A ReactNode that will always be displayed at the bottom of the
   * NavigationPanel.
   */
  sidebarBottomItems?: ComponentProp
  /**
   * # Right Panel Contents
   *
   * This allows for an array of panels to be passed in and rendered
   * to the right panel slot.
   *
   * The `useRightPanel` hook will allow you to open and close specific
   * components passed into this prop.
   */
  rightPanels?: RightPanelItem[]
}

export type RightPanelItem = {
  /**
   * The name that you'll use to open this panel using the `useRightPanel` hook's `handleOpen` method.
   */
  name: string
  /**
   * The width that you'd like the drawer to be (optional)
   */
  width?: number | string
  /**
   * The component that you'd like to display within the drawer
   */
  component: ComponentProp
}
