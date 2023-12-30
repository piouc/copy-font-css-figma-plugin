const toKebab = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
const toRem = (num: number) => `${num/16}rem`

const update = async () => {
  const node = figma.currentPage.selection[0]
  if(node && node.type === 'TEXT'){
    const cssObjects = node.getStyledTextSegments(['fontName', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing']).map(segment => {
      const cssObject: Record<string, string | number> = {}
      cssObject.fontSize = toRem(segment.fontSize)
      switch(segment.lineHeight.unit){
        case 'PIXELS':
          cssObject.lineHeight = segment.lineHeight.value / segment.fontSize
          break
        case 'PERCENT':
          cssObject.lineHeight = segment.lineHeight.value
          break
        case 'AUTO':
          cssObject.lineHeight = 'normal'
          break
      }
      return cssObject
    })
    const css = cssObjects.map(cssObject => Object.entries(cssObject).map(([propery, value]) => `${toKebab(propery)}: ${value};`).join('\n'))
    figma.ui.postMessage({type: 'data', data: css})
  }
}

figma.showUI(__html__)
figma.on('selectionchange', update)
update()