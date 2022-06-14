/* eslint-disable react/jsx-key */
import { Navigate, useLocation } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import type { RouteConfig, PageLayoutObject, AuthRouteStatus } from './types'
import { isValidPageLayout } from './types'
import React, { useMemo } from 'react'
import {
  RouterNavItemArray,
  __internal__pullOutNavItems,
  __internal__pullOutRoutes,
} from './newTypes'
import { NavItemArray } from 'design-system/pattern-app-shell'

/**
 * Higher-order component that can re-direct to a given fallback if we're
 * not logged-in
 */
function createAuthChecker<T>(useAuthStatus: () => T) {
  return function AuthCheck(
    props: React.PropsWithChildren<{
      statusCheck?: (status: T) => AuthRouteStatus
    }>,
  ) {
    const authStatus = useAuthStatus()
    const route = useLocation()

    const { children, statusCheck } = props
    // if this route doesn't have an auth check, just return children
    if (!statusCheck) {
      return <>{children}</>
    }

    const auth = statusCheck(authStatus)

    if (!auth.valid && !!auth.redirectTo) {
      // Redirect to some other page (fallback prop)
      return (
        <Navigate
          to={auth.redirectTo}
          state={{
            attemptedRoute: route,
          }}
        />
      )
    }

    // If we're auth'd correctly, then we're good, just return children
    return <>{children}</>
  }
}

/**
 * This is a function that can be called on a SINGLE `RouteConfig` that will
 * transform it (and it's children) into type `RouteObject`, so that we can
 * pass it to `react-router`'s `useRoutes` hook.
 *
 * Applies all configs to it in the process (wrappers, auth, etc)
 */
const routeConfigToRouteObj = <T extends PageLayoutObject, AuthStatus>(
  {
    wrapper = undefined,
    authCheck,
    ...route_props
  }: RouteConfig<T, AuthStatus>,
  page_layout_map: T,
  useUserAuthStatus: () => AuthStatus,
) => {
  const AuthChecker = useMemo(() => {
    return createAuthChecker(useUserAuthStatus)
  }, [authCheck])

  // Return if we don't have an element to wrap
  const hasElement = !!route_props.element

  // Route is asking to be wrapped by a wrapper
  if (hasElement && isValidPageLayout(wrapper, page_layout_map)) {
    const Wrapper = page_layout_map[wrapper]
    const original_element = route_props.element
    route_props.element = <Wrapper>{original_element}</Wrapper>
  }

  // Route is asking to be wrapped by a auth-checker
  if (hasElement) {
    const original_element = route_props.element
    route_props.element = (
      <AuthChecker statusCheck={authCheck}>{original_element}</AuthChecker>
    )
  }

  // If the route has children, and it looks to be valid, run this
  // recurse over the children.
  if (!!route_props.children && Array.isArray(route_props.children)) {
    /// Recursive, because we have to do what we just did for all the children
    /// Ignore undefined children if top level isn't nested
    route_props.children = route_props.children.map(d =>
      routeConfigToRouteObj(d, page_layout_map, useUserAuthStatus),
    )
  }

  return route_props as RouteObject
}

/**
 * A function that turns a list of RouteConfigs into Route Objects,
 * applying all configs to it in the process (wrappers, auth, etc)
 */
export const useCreateRoutes = <
  PageLayouts extends PageLayoutObject,
  Props = createRoutesProps<PageLayouts, any>,
>({
  layouts,
  routes,
  useUserAuthStatus,
}: Props extends createRoutesProps<PageLayouts, infer AuthStatus>
  ? createRoutesProps<PageLayouts, AuthStatus>
  : createRoutesProps<PageLayouts, any>) => {
  return routes.map(
    (route: RouteConfig<PageLayouts, ReturnType<typeof useUserAuthStatus>>) =>
      routeConfigToRouteObj<PageLayouts, ReturnType<typeof useUserAuthStatus>>(
        route,
        layouts,
        useUserAuthStatus,
      ),
  ) as RouteObject[]
}

/**
 * A function that turns a superset of both the react-router-dome config
 * and the NavItemArray (from app-shell) to create both:
 *
 * The `routes` you can use in `useRoutes` from react-router.
 * The `items` you can use as the NavItemArray in the `AppShell`.
 *
 * This is a convenience function.
 */
export function useCreateRoutesNavItems<
  PageLayouts extends PageLayoutObject,
  Props = createRoutesProps<PageLayouts, any>,
>({
  layouts,
  routes,
  useUserAuthStatus,
}: Props extends createRoutesAndNavItemsProps<PageLayouts, infer AuthStatus>
  ? createRoutesAndNavItemsProps<PageLayouts, AuthStatus>
  : createRoutesAndNavItemsProps<PageLayouts, any>): [
  use_routes_config: RouteObject[],
  nav_item_array: NavItemArray,
] {
  const routes_config = __internal__pullOutRoutes(routes)
  const nav_items = __internal__pullOutNavItems(routes)
  const rr_routes = useCreateRoutes({
    layouts,
    routes: routes_config,
    useUserAuthStatus,
  })

  return [rr_routes, nav_items]
}

export type createRoutesProps<
  PageLayouts extends PageLayoutObject,
  BaseType extends createRoutesPropsBase<PageLayouts, any>,
> = BaseType extends createRoutesPropsBase<PageLayouts, infer AuthStatus>
  ? createRoutesPropsBase<PageLayouts, AuthStatus>
  : createRoutesPropsBase<PageLayouts, any>

export type createRoutesPropsBase<
  PageLayouts extends PageLayoutObject,
  AuthStatus = unknown,
> = {
  /**
   * The `RoutesConfig` object that defines all of the routes
   * that should be used by react-router-dom.
   *
   * This is a _superset_ of the configuration that
   * react-router-dom asks for in `useRoutes()`.
   *
   * In addition to the normal react-router-dom config, you
   * can specify which wrapper you'd like to wrap the page,
   * by specifying the key of the wrapper you'd like that's
   * defined in the `layouts` key of the `createRoutesProps`
   * function.
   *
   * You can also provide a default authentication level required
   * to access the page, if you so choose – which will
   * automatically re-direct to a specified fallback route if
   * they try to be accessed without having proper permissions.
   */
  routes: RouteConfig<PageLayouts, AuthStatus>[]
  /**
   * An object that defines wrapper functions that can be used to
   * wrap any of the pages in the `routes` key of this object.
   *
   * Each `key: value` in this object will act as the reference
   * for what you can specify as a `wrapper` in your routes objects.
   */
  layouts: PageLayouts
  /**
   * A react hook that returns the current authentication state
   * of the user.
   *
   * This is used to re-direct to the `fallback_route` if the
   * authentication state is invalid for the current user.
   */
  useUserAuthStatus: () => AuthStatus
}

export type createRoutesAndNavItemsProps<
  PageLayouts extends PageLayoutObject,
  BaseType extends createRoutesPropsBase<PageLayouts, any>,
> = BaseType extends createRoutesAndNavItemsPropsBase<
  PageLayouts,
  infer AuthStatus
>
  ? createRoutesAndNavItemsPropsBase<PageLayouts, AuthStatus>
  : createRoutesAndNavItemsPropsBase<PageLayouts, any>

export type createRoutesAndNavItemsPropsBase<
  PageLayouts extends PageLayoutObject,
  AuthStatus = unknown,
> = {
  /**
   * The `RoutesConfig` object that defines all of the routes
   * that should be used by react-router-dom.
   *
   * This is a _superset_ of the configuration that
   * react-router-dom asks for in `useRoutes()` with additional
   * options that will be passed to an `AppShell`.
   *
   * In addition to the normal react-router-dom config, you
   * can specify which wrapper you'd like to wrap the page,
   * by specifying the key of the wrapper you'd like that's
   * defined in the `layouts` key of the `createRoutesProps`
   * function.
   *
   * You can also provide a default authentication level required
   * to access the page, if you so choose – which will
   * automatically re-direct to a specified fallback route if
   * they try to be accessed without having proper permissions.
   */
  routes: RouterNavItemArray<PageLayouts, AuthStatus>
  /**
   * An object that defines wrapper functions that can be used to
   * wrap any of the pages in the `routes` key of this object.
   *
   * Each `key: value` in this object will act as the reference
   * for what you can specify as a `wrapper` in your routes objects.
   */
  layouts: PageLayouts
  /**
   * A react hook that returns the current authentication state
   * of the user.
   *
   * This is used to re-direct to the `fallback_route` if the
   * authentication state is invalid for the current user.
   */
  useUserAuthStatus: () => AuthStatus
}
