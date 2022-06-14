import React, { useMemo } from 'react'

import ForwardIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  ListItem,
  ListItemButton as LiButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'

import { useCollapsableChildren } from '../../../hooks'
import {
  classname,
  ListItemButtonClass,
  ListItemTextClass,
  NavItemStyles,
} from '../styles'

import type { NavItemChildProps } from '../types'

export default function LowLevelNavItem({
  title,
  ...baseProps
}: NavItemChildProps & { setIsOpenTrue?: () => void }) {
  const theme = useTheme()
  const NavStyles = useMemo(() => {
    return NavItemStyles(
      theme,
      {
        paddingX: '4px',
        paddingY: '2px',
        marginRight: '4px',
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        overflow: 'hidden',
        [`& ${classname('text')}`]: {
          borderRadius: `6px`,
          paddingY: '4px',
          paddingLeft: '8px',
          paddingRight: '4px',
        },
      },
      baseProps?.sx,
    )
  }, [theme, baseProps?.sx])

  const { currentIsActive: isActive, childProps } =
    useCollapsableChildren(baseProps)
  const {
    showForwardIcon = false,
    icon = null,
    testid = null,
    showTestId = false,
    ...props
  } = {
    showForwardIcon: false,
    testid: null,
    showTestId: false,
    icon: 'icon' in childProps && childProps.icon,
    ...childProps,
  }

  const LinkComponent =
    props.LinkComponent ?? // Try to use the manually defined LinkComponent
    // Try to use the globally-defined LinkComponent from the theme
    theme?.components?.MuiButtonBase?.defaultProps?.LinkComponent ??
    // Fallback to using a normal anchor tag
    'a'

  // List item button cannot infer that it has an href property,
  // because we conditionally apply it's element type depending
  // on if it has an href property or not.
  const ListItemButton: any = LiButton

  const testProps = {
    item: showTestId
      ? {
          'data-navitem-testid': testid,
        }
      : {},
    button: showTestId
      ? {
          'data-navbutton-testid': testid,
          'data-navbutton-test-isactive': isActive,
        }
      : {},
  }

  return (
    <ListItem
      {...testProps.item}
      sx={{ maxWidth: '100%', position: 'relative' }}
      disablePadding
      className="MuiNavItemlowLevel"
    >
      <ListItemButton
        {...props}
        {...testProps.button}
        className={ListItemButtonClass(isActive)}
        selected={isActive}
        sx={NavStyles}
        LinkComponent={LinkComponent}
        {...('href' in props
          ? {
              component: LinkComponent,
              'aria-current': isActive ? 'page' : null,
            }
          : {})}
      >
        <ListItemText
          className={ListItemTextClass()}
          primary={
            <Typography
              sx={{
                margin: 0,
                display: 'flex',
                fontWeight: theme.typography.fontWeightRegular,
                position: 'relative',
                width: '100%',
              }}
              variant="body2"
              component="span"
              color={'inherit'}
            >
              {!icon && (
                <ListItemIcon sx={{ marginRight: 0.25, minWidth: 24 }} />
              )}
              {icon && (
                <ListItemIcon
                  sx={{
                    marginRight: 0.25,
                    marginLeft: 0.5,
                    minWidth: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': {
                      fontSize: '1.125em',
                      fill: isActive
                        ? theme.palette.primary.light
                        : theme.palette.text.secondary,
                    },
                  }}
                >
                  {baseProps.icon}
                </ListItemIcon>
              )}
              <Box
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: 'calc(100% - 52px)',
                }}
              >
                {title}
              </Box>
              {showForwardIcon && (
                <ListItemIcon
                  sx={{
                    marginRight: 0.25,
                    marginLeft: 'auto',
                    minWidth: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': {
                      fontSize: '1.25em',
                      fill: isActive
                        ? theme.palette.primary.light
                        : theme.palette.text.secondary,
                    },
                  }}
                >
                  <ForwardIcon />
                </ListItemIcon>
              )}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
