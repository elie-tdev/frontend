import React from 'react'
import { Link } from 'react-router-dom'

import { createLinkComponent } from '../../lib/index'

/**
 * @abstract This component makes the default link from
 * React Router Dom act like a normal anchor tag.
 */
export const WrappedLink = createLinkComponent<HTMLAnchorElement>(
  (props, ref) => {
    return <Link to={props.href} ref={ref} {...props} />
  },
)
