import { CSSProperties } from 'react'

const toRem = (num: number) => `${num/16}rem`

const defaultStyle: CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1,
  letterSpacing: '0em'
} as const

export const segmentToCSSProperties = (segment: Segment) => {
  const style: CSSProperties = {}
  style.fontFamily = segment.fontName.family
  style.fontWeight = segment.fontName.style
  style.fontSize = toRem(segment.fontSize)
  switch(segment.lineHeight.unit){
    case 'PIXELS':
      style.lineHeight = segment.lineHeight.value / segment.fontSize
      break
    case 'PERCENT':
      style.lineHeight = segment.lineHeight.value
      break
    case 'AUTO':
      style.lineHeight = 'normal'
      break
  }
  switch(segment.letterSpacing.unit){
    case 'PIXELS':
      style.letterSpacing = `${segment.letterSpacing.value / segment.fontSize * 0.01}em`
      break
    case 'PERCENT':
      style.letterSpacing = `${segment.letterSpacing.value * 0.01}em`
      break
  }
  Object.entries(style).map(([property, value]) => {
    if(Object.hasOwn(defaultStyle, property) && defaultStyle[property as keyof typeof defaultStyle] === value){
      delete style[property as keyof typeof style]
    }
  })
  return style
}