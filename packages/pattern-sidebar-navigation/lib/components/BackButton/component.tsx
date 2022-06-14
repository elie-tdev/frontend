import React, { ReactElement } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { alpha, Box, ListItemButton, Typography, useTheme } from '@mui/material'

import type { ToolbarProps, TypographyProps } from '@mui/material'

export interface BackButtonProps {
  title: string
  href?: string
  onClick?: any
  toolbarSize?: ToolbarProps['variant']
  typographyProps?: TypographyProps
}

export function BackButton({
  href = undefined,
  onClick,
  title,
  typographyProps = {},
}: BackButtonProps): ReactElement {
  const theme = useTheme()
  return (
    <>
      <ListItemButton
        href={href}
        onClick={onClick}
        component={'a'}
        className="MuiBackButton-BAI"
        aria-label={`Move navigation to view ${title}'s parent.`}
        sx={{
          maxWidth: '100%',
          position: 'relative',
          '.MuiBackButton-BAI': {
            backgroundColor: 'transparent',
            overflow: 'hidden',
            boxSizing: 'border-box',
          },
          '.MuiBackButton-BAI:hover, .MuiBackButton-BAI:focus, .MuiBackButton-BAI.Mui-focusVisible, .MuiBackButton-BAI.Mui-focus, .MuiBackButton-BAI.Mui-active':
            {
              backgroundColor: 'transparent',
            },
          '.MuiBackButton-BAI.Mui-focusVisible, .MuiBackButton-BAI:focus-visible':
            {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity,
              ),
            },
          '.MuiBackButton-Text': {
            fontWeight: theme.typography.fontWeightBold,
            display: 'flex',
            alignItems: 'center',
          },
          '.MuiBackButton-TextIcon': {
            color: theme.palette.text.secondary,
            marginRight: 1,
            minWidth: '24px',
          },
        }}
      >
        <Typography
          variant="subtitle1"
          className="MuiBackButton-Text"
          sx={{ maxWidth: '100%' }}
          {...typographyProps}
        >
          <ArrowBackIcon
            fontSize="inherit"
            className="MuiBackButton-TextIcon"
          />
          <Box
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Box>
        </Typography>
      </ListItemButton>
    </>
  )
}
