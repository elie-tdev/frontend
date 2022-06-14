/**
 * Uncomment if you want to test with the pattern-sidebar-navigation
 * dev environment. (which has been moved to ./pattern-right-sidebar)
 *
 * You'll probably want to check-out 'Wrapper' for the page-layout,
 * and AppShell for the Routes/Pages (which is an auto-generator
 * which was helpful for testing the sidebar nav, but may not be useful
 * for your code).

import React from 'react'
import { render } from 'react-dom'


const rootElement = document.getElementById('app')


*/

/**
 * A bare-bones testing environement, if you want a clean slate.
 *
 * Feel free to delete the whole ./pattern-right-sidebar sibling directory
 * if you don't think you'll need it.
 */
import React from 'react'
import { render } from 'react-dom'

import { Entry } from './_entry'

const rootElement = document.getElementById('app')

render(<Entry />, rootElement)
