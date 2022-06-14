import React, { useContext, useMemo } from 'react'

import { Box, List, ListItem } from '@mui/material'

import { NavFrameItem, useFrames } from '../../..'
import BackButton from '../../BackButton'
import NavItemBase from '../../NavItem'
import { NavPanelContext } from '../context'
import type { LinkComponent } from 'design-system/pattern-utils'

type UseFramesReturn = ReturnType<typeof useFrames>

export interface InternalNavigationImplProps {
  items: NavFrameItem[]
  parent: number | null
  parentItemTitle: string | null
  handleChangeFrames: UseFramesReturn['handleChangeFrames']
  linkComponent: LinkComponent
  isHiddenItem: boolean
  topItemHomeComponent?: NonNullable<React.ReactNode>
  handleBackButtonClick: UseFramesReturn['handleBackButtonClick']
  style?: any // used for Slide in MUI/react-transition-group
  frameKey: string
  showTestIds: boolean
  backgroundColor: string
}

export const InternalNavigationImpl = React.forwardRef(
  (
    {
      items,
      parent,
      parentItemTitle,
      handleChangeFrames,
      linkComponent,
      handleBackButtonClick,
      style,
      frameKey,
      backgroundColor,
      showTestIds,
      topItemHomeComponent = undefined,
      isHiddenItem,
    }: InternalNavigationImplProps,
    ref: any,
  ) => {
    const NavItemList = ({
      navigationItems,
      isChildNavItem = false,
      setIsOpenTrue,
    }: {
      navigationItems: NavFrameItem[]
      isChildNavItem?: boolean
      setIsOpenTrue?: () => void
      parentActiveHref?: boolean
    }) => {
      const { checkIsActive: isActive, framesWithActiveChildren } =
        useContext(NavPanelContext)

      return (
        <>
          {navigationItems.map(item => {
            if ('href' in item) {
              return (
                <NavItemBase
                  showTestId={showTestIds}
                  testid={item['testid'] ?? null}
                  LinkComponent={linkComponent as any as 'a'}
                  key={`nav-item-${item.href}`}
                  title={item.title}
                  href={item.href}
                  isActive={isActive(item.href)}
                  icon={item.icon}
                  {...(isChildNavItem
                    ? {
                        isChildNavItem,
                        setIsOpenTrue,
                      }
                    : {})}
                />
              )
            } else if ('nextItem' in item) {
              return (
                <NavItemBase
                  showTestId={showTestIds}
                  testid={item['testid'] ?? null}
                  key={`nav-item-next-${item.nextItem}`}
                  title={item.title}
                  onClick={handleChangeFrames(item.nextItem)}
                  isActive={framesWithActiveChildren.includes(item.nextItem)}
                  icon={item.icon}
                  showForwardIcon={true}
                  {...(isChildNavItem
                    ? {
                        isChildNavItem,
                        setIsOpenTrue,
                      }
                    : {})}
                />
              )
            } else if ('children' in item) {
              return (
                <NavItemBase
                  showTestId={showTestIds}
                  testid={item['testid'] ?? null}
                  key={`nav-item-parent-${item.title}`}
                  title={item.title}
                  icon={item.icon}
                  {...(isChildNavItem
                    ? {
                        isChildNavItem,
                        setIsOpenTrue,
                      }
                    : {})}
                >
                  <NavItemList
                    isChildNavItem={true}
                    navigationItems={item.children}
                  />
                </NavItemBase>
              )
            } else {
              return <a href="hello">hello</a>
            }
          })}
        </>
      )
    }

    const navItems = useMemo(
      () => <NavItemList navigationItems={items} />,
      [items],
    )

    const hasBackButton = isHiddenItem
      ? true
      : parent !== null && parentItemTitle !== null

    return (
      <Box
        component="nav"
        ref={ref}
        style={style}
        data-sidebarnav-frameid={frameKey}
        sx={{
          position: 'absolute',
          contain: 'strict',
          inset: '0px',
          padding: 0,
        }}
      >
        <List
          sx={{
            margin: 0,
            padding: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        >
          {!hasBackButton &&
            topItemHomeComponent !== undefined &&
            topItemHomeComponent}
          {hasBackButton && (
            <ListItem
              disablePadding
              disableGutters
              sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: backgroundColor,
                maxWidth: '100%',
              }}
            >
              <BackButton
                title={parentItemTitle as string}
                onClick={handleBackButtonClick}
              />
            </ListItem>
          )}
          {navItems}
        </List>
      </Box>
    )
  },
)
