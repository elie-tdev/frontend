import { lazy } from 'react'

const load = (page: string) => lazy(() => import(`./${page}/index.tsx`))

export const Pages = {
  Home: load('home'),
  Login: load('login'),
}
