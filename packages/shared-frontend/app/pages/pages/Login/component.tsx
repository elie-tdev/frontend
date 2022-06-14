import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import useMuiTheme from '@mui/material/styles/useTheme'

import { SimpleNav } from '../../../components'
import useTheme from '../../../hooks/useTheme'
import FormElements from './formElements'
import Logo from './logo'

export const Login = () => {
  const theme = useMuiTheme()
  const { toggle: toggleTheme, type: themeType } = useTheme()
  const [isLogin, setIsLogin] = React.useState(true)

  return (
    <>
      <Box
        width="100%"
        height="100%"
        maxHeight="100%"
        overflow="hidden"
        bgcolor={theme.palette.background.default}
      >
        <Box
          top={0}
          left={0}
          right={0}
          paddingX={3}
          display="flex"
          position="absolute"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo width={80} height={64} color={'currentColor'} />
          <Box>
            <SimpleNav />
            <Button color="inherit" onClick={toggleTheme}>
              {themeType === 'light' ? 'Dark Theme' : 'Light Theme'}
            </Button>
          </Box>
        </Box>
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent={'start'}
          alignItems="center"
          flexDirection="column"
        >
          <Box
            width="95%"
            maxWidth="50ch"
            mt={'calc(25vh - 64px)'}
            paddingY={2}
            paddingX={[2, 4]}
            borderRadius={20}
          >
            <Box mb={4}>
              <Typography variant="h4" align="center">
                {isLogin ? 'Welcome back!' : 'Welcome!'}
              </Typography>
              <Typography
                align="center"
                variant="h6"
                style={{ fontWeight: 'normal' }}
              >
                {isLogin
                  ? 'Please login to continue.'
                  : 'Please signup to continue.'}
              </Typography>
            </Box>
            <FormElements
              toggleType={() => setIsLogin(!isLogin)}
              type={isLogin ? 'login' : 'register'}
            />
          </Box>
        </Box>
        <Box color="info.dark">Hello Login</Box>
      </Box>
    </>
  )
}
