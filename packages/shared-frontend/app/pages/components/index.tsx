import React, { Suspense } from 'react'
import { useRoutes } from 'react-router'

import { Layout } from '../../components/Layout'
import Loading from '../../components/Loading'
import { ComponentsRoutes } from '../../components/router/routes.components'

function Components() {
  const routes = useRoutes(ComponentsRoutes)

  return (
    <Layout>
      <Suspense fallback={<Loading loadingName="components." />}>
        {routes}
      </Suspense>
    </Layout>
  )
}

export default Components
