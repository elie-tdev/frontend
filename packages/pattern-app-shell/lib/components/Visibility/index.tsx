import React, { PropsWithChildren, useContext, useMemo } from 'react'
import { Wrapper } from '../Wrapper'
import { AppShellCtx } from '../../context/global'
import { AppShellProps } from '../../types/props'

export const Visibility = ({
  children,
  ...appShellProps
}: PropsWithChildren<AppShellProps>) => {
  const ctx = useContext(AppShellCtx)

  const wrapperContents = useMemo(
    () =>
      ctx.shell.isOpen ? (
        <Wrapper {...appShellProps}>{children}</Wrapper>
      ) : (
        <>{children}</>
      ),
    [appShellProps, ctx.shell.isOpen],
  )

  return wrapperContents
}
