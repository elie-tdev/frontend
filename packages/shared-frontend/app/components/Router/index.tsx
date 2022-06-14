import React, { Suspense } from 'react'
import { useRoutes } from 'react-router'

import { Layout } from '../../components/Layout'
import Loading from '../../components/Loading'
import { AllRoutes } from './routes.all'

function Routes() {
  const routes = useRoutes(AllRoutes)

  return <Suspense fallback={<Loading loadingName="App" />}>{routes}</Suspense>
}

export default Routes
