type Segment = Pick<StyledTextSegment, 'fontName' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'characters' | 'start' | 'end'>
type Size = {
  width: number
  height: number
}
type Message = {
  type: 'data',
  data: string[]
} | {
  type: 'segments',
  data: Segment[]
} | {
  type: 'fonts',
  data: FontName[]
} | {
  type: 'sizes',
  data: Size[]
}
type PluginMessage<T> = {
  pluginMessage: T
}