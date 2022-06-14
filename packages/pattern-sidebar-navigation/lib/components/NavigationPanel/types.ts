export interface NavigationPanelContext {
  checkIsActive: (href: string) => boolean
  framesWithActiveChildren: number[]
}
