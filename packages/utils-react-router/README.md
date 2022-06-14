# A router utility for teams that can use react-router v6.

An abstraction developed mostly for the DS team, when creating new apps, this allows us to control navigation and routing in one single hook, and one single config object.

This could be used by any team using `react-router` that is able to migrate to v6, however.

This provides an easy way to unify logic for routing, and define navigation configs at the same time:

- Allows you to define a routes object that will automatically be converted into a react node that renders all of your routes (like `useRoutes` from `react-router@6`)
- Each of those routes to be configured with a title that can be used for sidebar navigation
- Each route can also have an `element` that determines what renders when that path is active
- Auth rules can be set for each route, and there can be an unlimited number of user-defined auth rules.
