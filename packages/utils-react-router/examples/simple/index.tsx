import React from 'react'
import {
  AuthRouteStatus,
  useCreateRoutes,
} from 'design-system/utils-react-router'
import { Box, Button, Typography } from '@mui/material'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useUserAuth, mkComponent, useUserAuthStatus, Nav } from './utils'

/**
 * An example of how to store wrappers. You don't have to store them
 * inline (as shown here), but it has to be a simple object with
 * the `{ [key: string]: <Some-Component-That-Takes-Children> }` interface.
 *
 * These examples have their background color set to grey so that you can see
 * the area that they use.
 */
const Layouts = {
  mainWrapper: (props: { children: React.ReactNode | undefined }) => (
    <Box padding={2} bgcolor="rgba(0,0,0,.08)">
      <Typography variant="h5">Main Layout</Typography>
      <Nav />
      {props.children}
    </Box>
  ),
  homeWrapper: (props: { children: React.ReactNode | undefined }) => (
    <Box padding={2} bgcolor="rgba(0,0,0,.08)">
      <Typography variant="h5">Home Layout</Typography>
      <Nav />
      {props.children}
    </Box>
  ),
}

const authChecks = {
  /**
   * The status that you get in this function depends on the return type
   * of the `useUserAuthStatus` hook that you provide to `useCreateRoutes`.
   *
   * In our case, this is a boolean.
   *
   * The return type of an auth check _must_ be of type `AuthRouteStatus`,
   * which either returns an object with `valid: true`, or one with `valid`
   * to `false`, and a `redirectTo: string`.
   *
   * This function will get run every time someone tries to access a given
   * route that also has an `element` property set.
   */
  goSignin: (status: ReturnType<typeof useUserAuthStatus>): AuthRouteStatus =>
    status ? { valid: true } : { valid: false, redirectTo: '/sign-in' },
}

export const SimpleExample = () => {
  /**
   * The main hook you'll need to use.
   *
   * This will take a similar config that you'd normally pass to
   * react-router-dom's `useRoutes`, but it provides a nice organized
   * way to use wrappers, and automatically-applied authGuards that
   * can re-direct users if permissions aren't met for certain routes.
   */
  const routeObjs = useCreateRoutes({
    layouts: Layouts,
    // The routes that will be rendered.
    //
    // Each one has the ability to set an element, which allows for some more
    // advanced features:
    //
    // - `wrapper`: This describes what wrapper will be used from the `layouts`
    //    object above to wrap the element for this route.
    //
    // - `authCheck`: this is an optional function that will recieve the result
    //    of your `useUserAuthStatus` hook. It can return an `AuthRouteStatus`,
    //    which can trigger a redirect if the auth status is not valid.
    routes: [
      {
        index: true, // from react-router, sets a default route
        path: '/home', // the path for react-router
        element: mkComponent('Home'), // the component this route should render
        wrapper: 'homeWrapper', // the name of the wrapper in `Layouts`
      },
      {
        path: '/private',
        authCheck: authChecks.goSignin,
        element: mkComponent('Private'),
        wrapper: 'mainWrapper',
      },
      {
        path: '/sign-in',
        element: mkComponent('Set Login Status', <LoginPage />),
        wrapper: 'mainWrapper',
      },
      {
        path: '/parent',
        children: [
          {
            path: 'child',
            element: mkComponent('child'),
            wrapper: 'mainWrapper',
          },
        ],
      },
    ],
    // This is a hook that routes can run to see what the current authState
    // is. Whatever the return-type of this function is will be exatly what
    // is passed into your `authChecks` – meaning you can represent multiple
    // different role-based rules depending on how complicated your auth
    // setup is.
    useUserAuthStatus,
  })
  const routes = useRoutes(routeObjs)
  return routes
}

// This is just a utility for the example
const LoginPage = () => {
  const { setLoggedIn } = useUserAuth()
  const { state } = useLocation()
  const navigate = useNavigate()
  const login = () => {
    setLoggedIn(true)
    state?.attemptedRoute
      ? navigate(state.attemptedRoute, { replace: true })
      : navigate('/home', { replace: true })
  }

  return (
    <>
      <Typography gutterBottom variant="h5">
        Sign In
      </Typography>
      <Button onClick={login}>Sign In</Button>
    </>
  )
}
