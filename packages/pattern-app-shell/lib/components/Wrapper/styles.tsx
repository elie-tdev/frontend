import type { Theme } from '@mui/material'
import { makeStyles } from './makeStyles'
import type { BreakpointDevice } from '../../hooks/internal.useBreakpoints'

const useBreakpoints = (device: BreakpointDevice) => ({
  tabletDown: <T,>(mobile: T, other: T | undefined = undefined) =>
    device !== 'desktop' ? mobile : other,
  tabletUp: <T,>(desktop: T, mobile: T | undefined = undefined) =>
    device === 'desktop' ? desktop : mobile,
})

export const useStyles = makeStyles(
  (theme: Theme, { drawerWidth, breakpoints, clipRightDrawer }) => {
    const { darkMode, paperBackground, sidebarBackground, toolbarBackground } =
      useStyleProps(theme)
    const [device] = breakpoints
    const { tabletDown, tabletUp } = useBreakpoints(device)

    const currentDrawerWidth = drawerWidth[device]

    return {
      wrapper: { display: 'flex', height: '100%' },
      appBar: {
        width: tabletUp(`calc(100% - ${currentDrawerWidth}px)`),
        ml: tabletUp(`${currentDrawerWidth}px`),
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        borderBottom: 'none',
        backgroundColor: toolbarBackground,
        // performance optimization, since the appbar has many
        // different interactions via it's z-index and
        // the left and right panels + their overlays
        contain: 'paint, layout',
        zIndex:
          clipRightDrawer && device === 'desktop'
            ? theme.zIndex.drawer + 1
            : undefined,
      },
      appbarToolbar: {
        // this exists only for user styles
      },
      appbarMenuButton: {
        mr: 2,
        display: tabletUp('none'),
      },
      appbarMenuIcon: {
        // this exists only for user styles
      },
      navWrapper: {
        width: tabletUp(currentDrawerWidth),
        flexShrink: tabletUp(0),
      },
      navDrawerTablet: {
        display: tabletDown('block', 'none'),
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: currentDrawerWidth,
          backgroundColor: sidebarBackground,
        },
      },
      navDrawerDesktop: {
        display: 'block',
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: currentDrawerWidth,
          border: 'none',
          borderRight: darkMode ? `1px solid ${theme.palette.divider}` : 'none',
          backgroundColor: sidebarBackground,
        },
      },
      mainContainer: {
        background: 'red',
        padding: '24px',
        width: '100%',
        height: '100%',
      },
      content: {
        flexGrow: 1,
        p: device === 'mobile' ? 1.5 : device === 'tablet' ? 2.5 : 3,
        backgroundColor: paperBackground,
        height: '100%',
      },
      rightPanelDrawer: {
        contain: 'strict',
        width:
          device === 'mobile'
            ? drawerWidth.mobile
            : device === 'tablet'
            ? drawerWidth.tablet
            : drawerWidth.desktop,
      },
      sidebarFrameWrapper: {},
      sidebarFrameListL1: {},
      sidebarFrameListL2: {},
      sidebarItemL1: {},
      sidebarItemButtonL1: {
        paddingInlineStart: device === 'mobile' ? '16px' : '8px',
        paddingInlineEnd: device === 'mobile' ? '16px' : '8px',
      },
      sidebarItemTextWrapperL1: {},
      sidebarItemTypographyL1: {},
      sidebarItemIconStartL1: {},
      sidebarItemIconEndL1: {},
      sidebarItemIconSvgL1: {},
      sidebarItemTypographyInnerL1: {},
      sidebarItemL2: {},
      sidebarItemButtonL2: {
        paddingInlineStart: '16px',
        paddingInlineEnd: '12px',
      },
      sidebarItemTextWrapperL2: {},
      sidebarItemTypographyL2: {},
      sidebarItemIconStartL2: {},
      sidebarItemIconEndL2: {},
      sidebarItemIconSvgL2: {},
      sidebarItemTypographyInnerL2: {},
      sidebar: {
        // Main Sidebar Frame Wrapper
        '[data-sidebarnav-frameid]': {
          border: '1px solid green',
        },
        // Main Sidebar Frame List
        '[data-sidebarnav-frameid] > ul': {
          border: '1px solid blue',
        },
        // Main Sidebar Child Frame List
        '.MuiCollapse-wrapperInner > ul': {
          border: '2px solid yellow',
        },
        // Main Sidebar Frame Parent Item
        '[data-sidebarnav-frameid] > ul > .MuiNavItemlowLevel': {
          border: '1px solid red',
          // Main Button Area
          '& > .MuiListItemButton-root': {
            // Text Content Wrapper for Sidebar
            '& > .Mui-NavItemText': {
              // Typography Component
              '& .MuiTypography-root': {},
              // Icon Wrapper (Start)
              '& .MuiListItemIcon-root:first-of-type': {},
              // Icon Wrapper (End)
              '& .MuiListItemIcon-root:last-of-type': {},
              // Icon SVG
              '& .MuiSvgIcon-root': {},
              // Text Span
              '& .MuiBox-root': {},
            },
          },
        },
        // Main Sidebar Frame Child Item
        '.MuiCollapse-wrapperInner > ul > .MuiNavItemlowLevel': {
          border: '1px solid rebeccapurple',
          // Main Button Area
          '& > .MuiListItemButton-root': {
            // Text Content Wrapper for Sidebar
            '& > .Mui-NavItemText': {
              // Typography Component
              '& .MuiTypography-root': {},
              // Icon Wrapper (Start)
              '& .MuiListItemIcon-root:first-of-type': {},
              // Icon Wrapper (End)
              '& .MuiListItemIcon-root:last-of-type': {},
              // Icon SVG
              '& .MuiSvgIcon-root': {},
              // Text Span
              '& .MuiBox-root': {},
            },
          },
        },
      },
    }
  },
)

const useStyleProps = (theme: Theme) => {
  const darkMode = theme.palette.mode === 'dark'
  const paperBackground = darkMode
    ? theme.palette.background.paper
    : theme.palette.grey[50]
  const toolbarBackground = darkMode
    ? theme.palette.background.paper
    : theme.palette.grey[50]
  const sidebarBackground = theme.palette.background.paper
  return { darkMode, paperBackground, toolbarBackground, sidebarBackground }
}
