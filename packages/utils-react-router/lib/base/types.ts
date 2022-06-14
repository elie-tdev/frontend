import { RouteObject } from 'react-router-dom'

/**
 * An object that defines the names and components that can be used
 * to wrap certain routes.
 *
 * For example, if you create this object:
 *
 * ```tsx
 * const exampleWrappers = {
 *  mainWrapper: ({ children }) => <div id="wrapper">{children}</div>
 * }
 * ```
 *
 * ...You could create routes that are wrapped with mainWrapper, by
 * specifying it in your routes config, like so:
 *
 * ```tsx
 * const routes: RouteConfig<typeof exampleWrappers> = [
 *    {
 *      authenticated: false,
 *      wrapper: 'mainWrapper',
 *      index: true,
 *      element: <SomePage />,
 *      children: [
 *        // ...etc
 *      ]
 *    }
 * ]
 * ```
 */
export type PageLayoutObject<
  T extends Record<string, Function> = Record<string, Function>,
> = T

/**
 * A type that is equal to any key of the pageLayoutMap object that
 * defines the types of wrappers we can use for a route
 */
export type PageLayout<
  T extends PageLayoutObject = PageLayoutObject<Record<string, Function>>,
> = keyof T

/**
 * Extention of the RouteObject exported from ReactRouter that includes
 * extra properties the lets us define custom parameters.
 *
 * For example, the `authenticated` and `wrapper` keys.
 */
export interface RouteConfig<E extends PageLayoutObject, AuthStatus>
  extends Omit<RouteObject, 'children'> {
  /**
   * Whether the route is authenticated or not. Should return an object of type `AuthRouteResult`.
   */
  authCheck?: (status: AuthStatus) => AuthRouteStatus
  /**
   * What component from pageLayoutMap we should use to wrap this page
   */
  wrapper?: keyof E
  /**
   * Make sure child routes have same format as `RouteConfig` instead of
   * `RouteObject`.
   */
  children?: RouteConfig<E, AuthStatus>[]
}

/** Type guard to make sure that the page layout is accepted  */
export const isValidPageLayout = <T extends PageLayoutObject>(
  p: PageLayout<T> | undefined | any,
  pageLayoutMap: T,
): p is PageLayout<T> => {
  const pExists = !!p
  if (pExists && p in pageLayoutMap) return true
  else return false
}

/**
 * This tells the main router whether or not this route is authenticated
 * or not.
 */
export type AuthRouteStatus =
  | { valid: true }
  | { valid: false; redirectTo: string }
