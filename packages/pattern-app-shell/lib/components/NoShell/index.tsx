import React, { PropsWithChildren, useContext } from 'react'
import { AppShellCtx } from '../../context/global'

export const NoShell = ({ children }: PropsWithChildren<{}>) => {
  const ctx = useContext(AppShellCtx)

  React.useEffect(() => {
    ctx.shell.closeShell()
    return () => {
      ctx.shell.openShell()
    }
  }, [ctx.shell.isOpen, ctx.shell.closeShell])

  return <>{children}</>
}
