import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { cssPropertiesToSrting } from '../utils/css-properties-to-string'
import { segmentToCSSProperties } from '../utils/segment-to-css-properties'
import copyToClipboard from 'copy-to-clipboard'

const Outer = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  white-space: pre;
  padding: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.25;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
  &:active {
    background-color: #f0f0f0;
  }
  & + & {
    border-top: 1px solid #eee;
  }
`

const Textarea = styled.textarea`
  pointer-events: none;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`

type CssListProps = {

}
export const CssList: FunctionComponent<CssListProps> = () => {
  const [segments, setSegments] = useState<Segment[]>([])
  const [fonts, setFonts] = useState<FontName[]>([])
  useEffect(() => {
    const listener = (e: MessageEvent<PluginMessage<Message>>) => {
      if(e.data.pluginMessage.type === 'segments'){
        setSegments(e.data.pluginMessage.data)
      }
      if(e.data.pluginMessage.type === 'fonts'){
        setFonts(e.data.pluginMessage.data)
      }
    }
    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])
  const copy = (css: string) => {
    copyToClipboard(css)
  }
  return <Outer>
    {
      segments.map((segment, i) => {
        const css = cssPropertiesToSrting(segmentToCSSProperties(segment)).join('\n')
        return <Item key={i} onClick={() => copy(css)}>
          {
            css
          }
        </Item>
      })
    }
  </Outer>
}