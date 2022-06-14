import React, { useMemo } from 'react'

import ExpandMore from '@mui/icons-material/ArrowDropDown'
import ExpandLess from '@mui/icons-material/ArrowDropUp'
import ForwardIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  Collapse,
  List,
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
import { setNavChildrenUtilities } from '../utils'

import type { NavItemTopLevelProps } from '../types'

export default function TopLevelNavItem({
  title,
  ...baseProps
}: NavItemTopLevelProps) {
  const { enterTransition, handleClick, hasActiveChild, open, setOpen } =
    useCollapsableChildren()

  const theme = useTheme()

  const NavStyles = useMemo(() => {
    return NavItemStyles(
      theme,
      {
        paddingX: '8px',
        paddingY: '2px',
        maxWidth: '100%',
        overflow: 'hidden',
        color: theme.palette.text.secondary,
        [`& ${classname('text')}`]: {
          borderRadius: `6px`,
          paddingY: '10px',
          paddingLeft: '14px',
          paddingRight: '4px',
          margin: 0,
        },
      },
      baseProps?.sx,
    )
  }, [theme, baseProps?.sx])

  const {
    isActive,
    icon: _icon,
    showForwardIcon,
    testid,
    showTestId,
    ...props
  } = {
    isActive: false,
    showForwardIcon: false,
    testid: null,
    showTestId: false,
    ...baseProps,
  }

  const mainContent = useMemo(
    () => (
      <>
        <ListItemText
          className={ListItemTextClass()}
          primary={
            <Typography
              component="span"
              variant="subtitle2"
              color={isActive ? 'primary' : 'textSecondary'}
              sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                lineHeight: '24px',
              }}
            >
              {'icon' in baseProps && (
                <ListItemIcon
                  sx={{
                    marginRight: 0.5,
                    minWidth: '24px',
                    '& > svg': {
                      fontSize: '1.25em',
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
              {'children' in props && (
                <ListItemIcon sx={{ marginLeft: 'auto', minWidth: 24 }}>
                  {open ? (
                    <ExpandLess
                      sx={{ color: theme.palette.grey['500'] }}
                      fontSize="small"
                    />
                  ) : (
                    <ExpandMore
                      sx={{ color: theme.palette.grey['500'] }}
                      fontSize="small"
                    />
                  )}
                </ListItemIcon>
              )}
              {showForwardIcon && !('children' in props) && (
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
      </>
    ),
    // We need to detect theme changes, since this may last longer
    // than a theme does.
    [baseProps.icon, title, hasActiveChild, open, isActive, theme],
  )

  const testProps = {
    item: showTestId
      ? {
          'data-navitem-testid': testid,
          'data-navitem-test-isopen': 'children' in props && open,
        }
      : {},
    button: showTestId
      ? {
          'data-navbutton-testid': testid,
          'data-navbutton-test-isactive': isActive,
        }
      : {},
  }

  if ('children' in props) {
    return (
      <>
        <ListItem
          {...testProps.item}
          sx={{ maxWidth: '100%', position: 'relative' }}
          disablePadding
          className="MuiNavItemlowLevel"
        >
          <LiButton
            {...props}
            {...testProps.button}
            className={ListItemButtonClass(isActive)}
            sx={NavStyles}
            onClick={handleClick}
            selected={isActive}
          >
            {mainContent}
          </LiButton>
        </ListItem>
        {React.Children.count(props.children) > 0 && (
          <Collapse in={open} enter={enterTransition}>
            <List
              sx={{
                position: 'relative',
                width: '100%',
                paddingLeft: 2,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {setNavChildrenUtilities(props.children, setOpen)}
            </List>
          </Collapse>
        )}
      </>
    )
  }

  // List item button cannot infer that it has an href property,
  // because we conditionally apply it's element type depending
  // on if it has an href property or not.
  const ListItemButton: any = LiButton

  const LinkComponent =
    props.LinkComponent ?? // Try to use the manually defined LinkComponent
    // Try to use the globally-defined LinkComponent from the theme
    theme?.components?.MuiButtonBase?.defaultProps?.LinkComponent ??
    // Fallback to using a normal anchor tag
    'a'

  return (
    <ListItem
      disablePadding
      className="MuiNavItemlowLevel"
      {...testProps.item}
    >
      <ListItemButton
        {...props}
        {...testProps.button}
        sx={NavStyles}
        className={ListItemButtonClass(isActive)}
        LinkComponent={LinkComponent}
        selected={isActive}
        aria-current={isActive ? 'page' : null}
        {...('href' in props ? { component: LinkComponent } : {})}
      >
        {mainContent}
      </ListItemButton>
    </ListItem>
  )
}
