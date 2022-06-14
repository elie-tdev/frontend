import type { SxProp, ComponentProp } from 'design-system/pattern-utils'

import type { PropsWithChildren } from 'react'

/**
 * ### Panel Base
 *
 * `PanelBase` is a type that represents a single 'pane' within the
 * `RightSidebar` component.
 *
 * #### Example
 * ```tsx
 * const singlePanel: PanelBase = {
 *    id: "account",
 *    title: "Account"
 *    icon: <AccountIcon />
 *    panel: <div>This is panel content.</div>
 * }
 * ```
 */
export interface PanelBase {
  id: string
  title: string | ComponentProp
  icon?: ComponentProp | null
  panel: ComponentProp | null
}

export type PanelArr = PanelBase[]

/**
 * ### Panel Settings
 *
 * `PanelSettings` is used for the config prop in the `RightSidebar`
 * component.
 *
 * #### Example
 *
 * ```tsx
 * return (
 *  <RightSidebar
 *    panels={[]}
 *    config={{
 *      width: 320,
 *      disableTitle: false,
 *      disableIcons: false,
 *      drawerSx: {
 *        backgroundColor: 'red'
 *      }
 *    }}
 *  >
 *    {children}
 *  </RightSidebar>
 * )
 * ```
 */
export type PanelSettings = {
  width: number
  disableTitle?: boolean
  disableIcons?: boolean
  drawerSx?: SxProp
}

/**
 * ### Panel Props
 *
 * `PanelProps` represent the props that can be set on the `RightSidebar`
 * component.
 *
 * #### Example
 *
 * ```tsx
 * return (
 *  <RightSidebar
 *    panels={[
 *      {
 *        id: "account",
 *        title: "Account"
 *        icon: <AccountIcon />
 *        panel: <div>This is panel content.</div>
 *      }
 *    ]}
 *    config={{
 *      width: 320,
 *      disableTitle: false,
 *      disableIcons: false,
 *      drawerSx: {
 *        backgroundColor: 'red'
 *      }
 *    }}
 *  >
 *    {children}
 *  </RightSidebar>
 * )
 * ```
 */
export type PanelProps = PropsWithChildren<{
  panels: PanelArr
  config: PanelSettings
}>
