import React, { useMemo, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useTheme,
} from '@mui/material'
import { useLeftPanel } from '../../hooks/internal.misc'
import type { AppShellProps } from '../../types/props'
import { useStyles } from './styles'
import { NavigationPanel } from 'design-system/pattern-sidebar-navigation'
import type { SxProp } from 'design-system/pattern-utils'
import { useBreakpoints } from '../../hooks/internal.useBreakpoints'
import { RightPanel } from '../RightPanel'
import { useRightPanel } from '../..'

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

export function Wrapper({
  container = undefined,
  components = undefined,
  testingEnvironment = false,
  sidebarDrawerWidth = {},
  currentUrl,
  linkComponent,
  sidebarItems,
  backgroundColor,
  showTestIds,
  clipRightDrawer = false,
  sxProps = {},
  children,
}: React.PropsWithChildren<AppShellProps>) {
  const theme = useTheme()
  const drawerWidths = {
    mobile: '100%',
    tablet: 375,
    desktop: 240,
    ...sidebarDrawerWidth,
  }
  // Ref for the appbar – we need this to be able to determine it's
  // height at runtime, because client code may affect it's final height.
  //
  // It'd be nice to not have to use this, because it triggers
  // the browser's compositor to do layout calcs every time...
  const appbarRef = useRef<HTMLDivElement>()

  // height of the appbar, if it exists
  const appbarHeightGuess =
    // Does the appbar/appbar-height exist?
    appbarRef.current?.clientHeight && appbarRef.current?.clientHeight != 0
      ? // if so, resolve it to the height of the appbar
        `${appbarRef.current?.clientHeight}px`
      : // otherwise, we shouldn't define a fixed height, because
        // we could accidentially cutoff items, simply because this app doesn't
        // have an appbar
        undefined

  // Combine the default drawer widths with client-defined drawer-widths
  // and use them as parameters to get our internally-defined styles.
  const styles = useStyles({
    ...drawerWidths,
    clipRightDrawer,
  })

  // Use our global context to open/close panels when needed
  const [sidebarOpen, setSidebarOpen] = useLeftPanel()

  const { isOpen: rightPanelOpen } = useRightPanel()

  // Breakpoint device used to toggle Navigaiton Drawers
  const [_, device] = useBreakpoints()

  // This is stored in a state because it needs to lag behind when closing to prevent jank. This causes some styling issues, but unfortunately, it's absolutely necessary.
  const [showFakeNavigationTopbar, setShowFakeNavigationTopbar] = useState(
    Boolean(clipRightDrawer && rightPanelOpen && device === 'desktop'),
  )

  // Boolean (whether screen is <= Tablet)
  const tablet = device === 'mobile' || device === 'tablet'
  // Boolean (whether screen is >= Desktop)
  const desktop = device === 'desktop'
  // Event Handler for when menu button is clicked
  const handleOpenSidebar = () => {
    setSidebarOpen(true)
  }

  // make sxProps from client code overwrite our internally-written styles
  const sx = useComposeStyles(styles, sxProps)
  // take all styles and put them into the correct selectors for the sidebar navigation sxProp. This is done because the pattern-sidebar-navigation provides just a single sx prop.
  const sidebarStyles = useNavigationStyles(sx, clipRightDrawer)
  // Get the content that we would place within the appbar's toolbar
  const ClientAppBar = components?.appbarContents ?? <></>

  /**
   * This handles showing/hiding our fake navigation topbar.
   */
  useEnhancedEffect(() => {
    const shouldShow = clipRightDrawer && rightPanelOpen && desktop
    const currentState = showFakeNavigationTopbar
    if (shouldShow && currentState === false) {
      setShowFakeNavigationTopbar(true)
    } else if (!shouldShow && currentState === true) {
      setTimeout(() => {
        setShowFakeNavigationTopbar(false)
      }, theme.transitions.duration.leavingScreen)
    }
  }, [clipRightDrawer, rightPanelOpen, desktop])

  // Prepare the pattern-sidebar-navigation's NavigationPanel to be used
  // within our main component
  const Sidebar = (
    <NavigationPanel
      items={sidebarItems}
      linkComponent={linkComponent}
      currentUrl={currentUrl}
      backgroundColor={backgroundColor}
      showTestIds={showTestIds}
      components={{
        bottomItems: components?.sidebarBottomItems,
        topItem: components?.sidebarTopItem ? (
          <Box
            height={appbarHeightGuess}
            marginBottom={2}
            bgcolor={backgroundColor}
          >
            {components?.sidebarTopItem}
          </Box>
        ) : undefined,
        topItemHome: components?.sidebarTopItemHome,
      }}
      sx={sidebarStyles}
    />
  )

  // Memoizing this is important, because it allows react to
  // not have to process it while it's being used.
  //
  // Normally, this wouldn't matter, but it only gets presented
  // during pretty computationally heavy animations (opening and)
  // closing the right sidebar.
  const fakeAppbar = useMemo(
    () => (
      <AppBar
        sx={{
          border: '0px solid transparent',
          height: appbarHeightGuess,
          width: `${drawerWidths.desktop}px`,
          left: 0,
          // This is another performance helper for the browser.
          //
          // It's basically telling the browser that it can composite
          // this container as if nothing outside of it can influence
          // it's layout.
          contain: 'strict',
          zIndex: theme.zIndex.drawer + 1,
        }}
        position="fixed"
      >
        {components?.sidebarTopItem}
      </AppBar>
    ),
    [
      components?.sidebarTopItem,
      theme.zIndex.drawer,
      drawerWidths.desktop,
      appbarRef.current?.clientHeight,
      device,
    ],
  )

  return (
    <Box sx={sx.wrapper}>
      <AppBar ref={appbarRef as any} position="fixed" sx={sx.appBar}>
        <Toolbar sx={sx.appbarToolbar}>
          <IconButton
            color="inherit"
            aria-label="open navigation drawer"
            edge="start"
            onClick={handleOpenSidebar}
            sx={sx.appbarMenuButton}
          >
            <MenuIcon sx={sx.appbarMenuIcon} />
          </IconButton>
          {ClientAppBar}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={sx.navWrapper}>
        {
          // Display only on Tablet (and below)
          !testingEnvironment && tablet && (
            <Drawer
              container={container}
              variant="temporary"
              open={sidebarOpen}
              onClose={handleOpenSidebar}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={sx.navDrawerTablet}
            >
              {Sidebar}
            </Drawer>
          )
        }
        {
          // Display only on Desktop (and above)
          ((!testingEnvironment && desktop) || testingEnvironment) && (
            <>
              {showFakeNavigationTopbar && fakeAppbar}
              <Drawer variant="permanent" sx={sx.navDrawerDesktop} open>
                {Sidebar}
              </Drawer>
            </>
          )
        }
      </Box>
      <Box
        component="main"
        sx={{
          ...sx.content,
          // Dynamically set the padding for the toolbar, since
          // client code may expand or decrease the offset needed
          // to clear the toolbar/appbar. We'll default to 64px if
          // we don't yet have a ref, since that's what the appbar's
          // height is as default.
          //
          // see appbarRef's comment for more context
          paddingTop: appbarHeightGuess,
        }}
      >
        {children}
      </Box>
      <RightPanel
        desktop={desktop}
        clip={clipRightDrawer}
        clipHeight={appbarHeightGuess}
        sx={sx.rightPanelDrawer}
      />
    </Box>
  )
}

/**
 * Simplifies the composition of SX props so that first param is overwritten by the second param using object-spread
 */
const compose = (defaults: SxProp, overrides: SxProp = {}): SxProp => ({
  ...defaults,
  ...overrides,
})

/**
 * This function was separated out simply for readability within the
 * main component (it's long). It just combines our styles with client code styles and
 * returns an identically-shaped object.
 *
 * @param styles - styles written internally
 * @param sxProps - styles written via client code
 * @returns - composition of the two objects, with client code overwriting the internal styles
 */
const useComposeStyles = (styles: any, sxProps: any) => {
  const sx = useMemo(
    () => ({
      wrapper: compose(styles.wrapper, sxProps.wrapper),
      appBar: compose(styles.appBar, sxProps.appBar),
      appbarToolbar: compose(styles.appbarToolbar, sxProps.appbarToolbar),
      appbarMenuButton: compose(
        styles.appbarMenuButton,
        sxProps.appbarMenuButton,
      ),
      appbarMenuIcon: compose(styles.appbarMenuIcon, sxProps.appbarMenuIcon),
      navWrapper: compose(styles.navWrapper, sxProps.navWrapper),
      navDrawerTablet: compose(styles.navDrawerTablet, sxProps.navDrawerTablet),
      navDrawerDesktop: compose(
        styles.navDrawerDesktop,
        sxProps.navDrawerDesktop,
      ),
      content: compose(styles.content, sxProps.content),
      rightPanelDrawer: compose(
        styles.rightPanelDrawer,
        sxProps.rightPanelDrawer,
      ),
      sidebarFrameWrapper: compose(
        styles.sidebarFrameWrapper,
        sxProps.sidebarFrameWrapper,
      ),
      sidebarFrameListL1: compose(
        styles.sidebarFrameListL1,
        sxProps.sidebarFrameListL1,
      ),
      sidebarFrameListL2: compose(
        styles.sidebarFrameListL2,
        sxProps.sidebarFrameListL2,
      ),
      sidebarItemL1: compose(styles.sidebarItemL1, sxProps.sidebarItemL1),
      sidebarItemButtonL1: compose(
        styles.sidebarItemButtonL1,
        sxProps.sidebarItemButtonL1,
      ),
      sidebarItemTextWrapperL1: compose(
        styles.sidebarItemTextWrapperL1,
        sxProps.sidebarItemTextWrapperL1,
      ),
      sidebarItemTypographyL1: compose(
        styles.sidebarItemTypographyL1,
        sxProps.sidebarItemTypographyL1,
      ),
      sidebarItemIconStartL1: compose(
        styles.sidebarItemIconStartL1,
        sxProps.sidebarItemIconStartL1,
      ),
      sidebarItemIconEndL1: compose(
        styles.sidebarItemIconEndL1,
        sxProps.sidebarItemIconEndL1,
      ),
      sidebarItemIconSvgL1: compose(
        styles.sidebarItemIconSvgL1,
        sxProps.sidebarItemIconSvgL1,
      ),
      sidebarItemTypographyInnerL1: compose(
        styles.sidebarItemTypographyInnerL1,
        sxProps.sidebarItemTypographyInnerL1,
      ),
      sidebarItemL2: compose(styles.sidebarItemL2, sxProps.sidebarItemL2),
      sidebarItemButtonL2: compose(
        styles.sidebarItemButtonL2,
        sxProps.sidebarItemButtonL2,
      ),
      sidebarItemTextWrapperL2: compose(
        styles.sidebarItemTextWrapperL2,
        sxProps.sidebarItemTextWrapperL2,
      ),
      sidebarItemTypographyL2: compose(
        styles.sidebarItemTypographyL2,
        sxProps.sidebarItemTypographyL2,
      ),
      sidebarItemIconStartL2: compose(
        styles.sidebarItemIconStartL2,
        sxProps.sidebarItemIconStartL2,
      ),
      sidebarItemIconEndL2: compose(
        styles.sidebarItemIconEndL2,
        sxProps.sidebarItemIconEndL2,
      ),
      sidebarItemIconSvgL2: compose(
        styles.sidebarItemIconSvgL2,
        sxProps.sidebarItemIconSvgL2,
      ),
      sidebarItemTypographyInnerL2: compose(
        styles.sidebarItemTypographyInnerL2,
        sxProps.sidebarItemTypographyInnerL2,
      ),
    }),
    [sxProps, styles],
  )

  return sx
}

/**
 * This was broken into a hook only for readability within the main
 * component (it's long). This takes the sx props that are related to
 * the sidebar navigation, and places them within the correct
 * css-selector to apply in a sensible way.
 *
 * @param sx - all of the composed styles from internal and client code
 * @returns - a SX object that's able to be used within the pattern-sidebar-navigation for more targeted styling
 */
const useNavigationStyles = (sx: any, clipRightDrawer: boolean): SxProp =>
  useMemo(
    () => ({
      '[data-sidebarnav-frameid]': sx.sidebarFrameWrapper,
      '[data-sidebarnav-frameid] .MuiToolbar-root': {
        zIndex: theme =>
          clipRightDrawer ? theme.zIndex.drawer + 1 : undefined,
      },
      '[data-sidebarnav-frameid] > ul': sx.sidebarFrameListL1,
      '.MuiCollapse-wrapperInner > ul': sx.sidebarFrameListL2,
      '[data-sidebarnav-frameid] > ul > .MuiNavItemlowLevel': {
        ...sx.sidebarItemL1,
        '& > .MuiListItemButton-root': {
          ...sx.sidebarItemButtonL1,
          '& > .Mui-NavItemText': {
            ...sx.sidebarItemTextWrapperL1,
            '& .MuiTypography-root': {
              ...sx.sidebarItemTypographyL1,
            },
            '& .MuiListItemIcon-root:first-of-type': {
              ...sx.sidebarItemIconStartL1,
            },
            '& .MuiListItemIcon-root:last-of-type': {
              ...sx.sidebarItemIconEndL1,
            },
            '& .MuiSvgIcon-root': {
              ...sx.sidebarItemIconSvgL1,
            },
            '& .MuiBox-root': {
              ...sx.sidebarItemTypographyInnerL1,
            },
          },
        },
      },
      '.MuiCollapse-wrapperInner > ul > .MuiNavItemlowLevel': {
        ...sx.sidebarItemL2,
        '& > .MuiListItemButton-root': {
          ...sx.sidebarItemButtonL2,
          '& > .Mui-NavItemText': {
            ...sx.sidebarItemTextWrapperL2,
            '& .MuiTypography-root': {
              ...sx.sidebarItemTypographyL2,
            },
            '& .MuiListItemIcon-root:first-of-type': {
              ...sx.sidebarItemIconStartL2,
            },
            '& .MuiListItemIcon-root:last-of-type': {
              ...sx.sidebarItemIconEndL2,
            },
            '& .MuiSvgIcon-root': {
              ...sx.sidebarItemIconSvgL2,
            },
            '& .MuiBox-root': {
              ...sx.sidebarItemTypographyInnerL2,
            },
          },
        },
      },
    }),
    [sx],
  )
