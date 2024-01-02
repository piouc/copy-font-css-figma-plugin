type Segment = Pick<StyledTextSegment, 'fontName' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'characters' | 'start' | 'end'>
type Message = {
  type: 'data',
  data: string[]
} | {
  type: 'segments',
  data: Segment[]
} | {
  type: 'fonts',
  data: FontName[]
}
type PluginMessage<T> = {
  pluginMessage: T
}