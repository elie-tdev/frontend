import React, { forwardRef } from 'react'
import { Link as BaseLink, LinkProps as BaseLinkProps } from 'react-router-dom'

interface LinkProps extends Omit<BaseLinkProps, 'to'> {
  href: BaseLinkProps['to']
}

export const Link = forwardRef<'a', LinkProps>(({ href, ...props }, ref) => (
  <BaseLink {...props} to={href} ref={ref as any} />
))
