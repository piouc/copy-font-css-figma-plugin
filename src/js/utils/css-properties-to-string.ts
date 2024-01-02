import { CSSProperties } from 'react'

const toKebab = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
export const cssPropertiesToSrting = (style: CSSProperties) => {
  return Object.entries(style).map(([propery, value]) => `${toKebab(propery)}: ${value};`)
}