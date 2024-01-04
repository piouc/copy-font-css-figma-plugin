import { isEqual, uniqWith } from 'lodash'

const update = async () => {
  const segments:Segment[] = figma.currentPage.selection.map(node => {
    if(node && node.type === 'TEXT'){
      return node.getStyledTextSegments(['fontName', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'fills', 'fillStyleId'])
    } else {
      return []
    }
  }).flat()
  figma.ui.postMessage({type: 'segments', data: segments})
  const sizes = figma.currentPage.selection.map(node => {
    return {
      width: node.width,
      height: node.height
    }

  })
  figma.ui.postMessage({type: 'sizes', data: sizes})
}
export const sendUsingFonts = () => {
  const textNodes = figma.currentPage.findAll(node => node.type === 'TEXT') as TextNode[]
  const fontNames = uniqWith(textNodes.map(node => node.getStyledTextSegments(['fontName']).map(segment => segment.fontName)).flat(), isEqual)
  figma.ui.postMessage({type: 'fonts', data: fontNames})
}

figma.showUI(__html__)
figma.on('selectionchange', update)
figma.ui.on('message', message => {
  if(message.type === 'ready'){
    update()
  }
})