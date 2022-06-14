import { Frames } from '../'

import type {
  NavItemArray,
  BaseItemLink,
  BaseItemParent,
  NavFrameLink,
} from '..'

// prettier-ignore
const items: NavItemArray = [
  { title: "a", href: "a" },
  { title: "b", href: "b" },
  { title: "c", href: "c" },
  { title: "d", children: [
    { title: "e", href: "e" },
    { title: "f", href: "f" },
    { title: "gc", children: [
      // New Frame
      // frame title should be 'gc'
      { title: "gc-h", href: "gc-h" },
      { title: "gc-i", href: "gc-i" },
      { title: "gc-j", href: "gc-j" },
    ] },
  ]},
  { title: "k", children: [
    { title: "l", href: "l" },
    { title: "m", href: "m" },
    { title: "nc", children: [
      // New Frame
      // frame title should be 'nc'
      { title: "nc-o", href: "nc-o" },
      { title: "nc-p", href: "nc-p" },
      { title: "nc-q", href: "nc-q" },
      { title: "nc-rc", children: [
        { title: "nc-rc-a", href: "nc-rc-a" },
        { title: "nc-rc-b", href: "nc-rc-b" },
        { title: "nc-rc-c", href: "nc-rc-c" },
        { title: "nc-rc-d", href: "nc-rc-d" },
        { title: "nc-rc-ec", children: [
          // New Frame
          // Frame title should be 'nc-rc-ec'
          { title: "nc-rc-ec-a", href: "nc-rc-ec-a"},
          { title: "nc-rc-ec-b", href: "nc-rc-ec-b"},
          { title: "nc-rc-ec-c", href: "nc-rc-ec-c"},
          { title: "nc-rc-ec-d", href: "nc-rc-ec-d"},
        ] }
      ] }
    ] },
  ]},
  { title: "o",
    forceNewFrame: true,
    children: [
    // New Frame, because of 'forceNewFrame'
    { title: "oa", href: "oa" },
    { title: "ob", href: "ob" },
    { title: "oc", children: [
      { title: "oc-a", href: "oc-a" },
      { title: "oc-b", href: "oc-b" },
      { title: "oc-c", href: "oc-c" },
    ] },
  ]}
]

type FramesReturn = ReturnType<typeof Frames>['frames']
type FinalFrame = FramesReturn[number]
const findFrameBase =
  (frames: FramesReturn) => (searchFn: (frame: FinalFrame) => boolean) => {
    return frames?.find(searchFn)
  }

const findByParent = (name: string) => (frame: FinalFrame) =>
  frame?.parentItemTitle === name

describe('Frames should function as expected', () => {
  it('Should break frames correctly', () => {
    const { frames } = Frames(items)
    const gc = findFrameBase(frames)(findByParent('gc'))
    const nc = findFrameBase(frames)(findByParent('nc'))

    expect(gc?.items?.find((x: any) => x.title === 'gc-h')).toBeDefined()
    expect(gc?.items?.find((x: any) => x.title === 'gc-i')).toBeDefined()
    expect(gc?.items?.find((x: any) => x.title === 'gc-j')).toBeDefined()
    expect(nc?.items?.find((x: any) => x.title === 'nc-o')).toBeDefined()
    expect(nc?.items?.find((x: any) => x.title === 'nc-p')).toBeDefined()
    expect(nc?.items?.find((x: any) => x.title === 'nc-q')).toBeDefined()
    expect(nc?.items?.find((x: any) => x.title === 'nc-rc')).toBeDefined()
    const nc_rcItems = nc?.items?.find(
      x => x.title === 'nc-rc',
    ) as BaseItemParent<BaseItemLink | NavFrameLink>
    expect(nc_rcItems.children).toBeDefined()
    expect(
      nc_rcItems.children.find((x: any) => x.title === 'nc-rc-a'),
    ).toBeDefined()
    expect(
      nc_rcItems.children.find((x: any) => x.title === 'nc-rc-b'),
    ).toBeDefined()
    expect(
      nc_rcItems.children.find((x: any) => x.title === 'nc-rc-c'),
    ).toBeDefined()
    expect(
      nc_rcItems.children.find((x: any) => x.title === 'nc-rc-d'),
    ).toBeDefined()
  })

  it('Should be able to find a frame by a link', () => {
    const { frames, links } = Frames(items)

    const checkHref = (href: string) => {
      const frameIdx = links.get(href)
      expect(frameIdx).toBeDefined()
      const frame = frames[frameIdx as number]
      const findHref = () => {
        if (!frame) return [undefined, undefined]
        const item = frame.items.find(x => 'href' in x && x.href === href)
        if (frame && href) return [href, frame.parentItemTitle]
        if (item && 'children' in item) {
          const itemChild = (item as any).children.find(
            (x: any) => 'href' in x && x.href === href,
          )
          return [itemChild, frame?.parentItemTitle]
        }
        return undefined
      }
      return findHref()
    }

    // Should be able to find a child href in the list it should be in
    // with an href of 'gc-h'
    expect(checkHref('gc-h')).toBeDefined()
    // and we expect it to have a parent title of 'gc'
    expect((checkHref('gc-h') as any)[1]).toBe('gc')

    // rinse-and-repeat
    expect(checkHref('nc-p')).toBeDefined()
    expect((checkHref('nc-p') as any)[1]).toBe('nc')

    // make sure it can resolve child-child nav items
    expect(checkHref('nc-rc-ec-a')).toBeDefined()
    expect((checkHref('nc-rc-ec-a') as any)[1]).toBe('nc-rc-ec')
  })

  it("Should create a new frame context if 'forceNewFrame' is set to true", () => {
    const { frames } = Frames(items)
    const o = findFrameBase(frames)(findByParent('o'))
    // For this to be defined, 'o' would need to be the title of the parent
    // frame (which would mean it worked!)
    expect(o).toBeDefined()
  })
})
