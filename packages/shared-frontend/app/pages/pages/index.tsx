import React, { Suspense } from 'react'
import { useRoutes } from 'react-router'

import { Layout } from '../../components/Layout'
import Loading from '../../components/Loading'
import { PagesRoutes } from '../../components/router/routes.pages'

function Pages() {
  const routes = useRoutes(PagesRoutes)

  return (
    <Suspense fallback={<Loading loadingName="page." />}>{routes}</Suspense>
  )
}

export default Pages
