import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { cssPropertiesToSrting } from '../utils/css-properties-to-string'
import { segmentToCSSProperties, toRem } from '../utils/segment-to-css-properties'
import copyToClipboard from 'copy-to-clipboard'
import { isEqual, omit, unionWith } from 'lodash'

const Outer = styled.div`
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  font-size: 0.75rem;
  line-height: 1.25;
  & + & {
    border-top: 1px solid #eee;
  }
`

const CSSItem = styled(Item)`
  padding: 0.25rem;
  white-space: pre;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
  &:active {
    background-color: #f0f0f0;
  }
`

const SizeItem = styled(Item)`
  display: flex;
  gap: 0.5rem;
  white-space: pre;
  padding: 0.25rem 0;
`

const SizeItemValue = styled.div`
  cursor: pointer;
  padding: 0.25rem;
  &:hover {
    background-color: #f8f8f8;
  }
  &:active {
    background-color: #f0f0f0;
  }

`

const Select = styled.select`
`

const ratioOptions = [
  {
    value: 1, label: '1/1'
  },
  {
    value: 1 / 2, label: '1/2'
  },
  {
    value: 1 / 3, label: '1/3'
  },
  {
    value: 1 / 4, label: '1/4'
  }
]

type CssListProps = {

}
export const CssList: FunctionComponent<CssListProps> = () => {
  const [segments, setSegments] = useState<Segment[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [ratio, setRatio] = useState(1)
  useEffect(() => {
    const listener = (e: MessageEvent<PluginMessage<Message>>) => {
      if(e.data.pluginMessage.type === 'segments'){
        setSegments(e.data.pluginMessage.data)
        console.log(e.data.pluginMessage.data)
      }
      console.log(e.data.pluginMessage)
      if(e.data.pluginMessage.type === 'sizes'){
        setSizes(e.data.pluginMessage.data)
      }
    }
    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])
  return <Outer>
    <Select onChange={e => setRatio(ratioOptions[Number(e.currentTarget.value)]?.value ?? 1)} defaultValue={0}>
      {
        ratioOptions.map((option, i) => {
          return <option key={i} value={i}>{option.label}</option>
        })
      }
    </Select>
    <ItemContainer>
      {
        sizes.map((size, i) => {
          const width = toRem(Math.round(size.width * ratio))
          const height = toRem(Math.round(size.height * ratio))
          return <SizeItem key={i}>
            <SizeItemValue onClick={() => copyToClipboard(width)}>width: {width}</SizeItemValue>
            <SizeItemValue onClick={() => copyToClipboard(height)}>height: {height}</SizeItemValue>
          </SizeItem>
        })
      }
      {
        unionWith(segments.map(segment => omit(segment, ['characters', 'start', 'end'])), isEqual).map((segment, i) => {
          const css = cssPropertiesToSrting(segmentToCSSProperties(segment)).join('\n')
          return <CSSItem key={i} onClick={() => copyToClipboard(css)}>
            {
              css
            }
          </CSSItem>
        })
      }
    </ItemContainer>
  </Outer>
}