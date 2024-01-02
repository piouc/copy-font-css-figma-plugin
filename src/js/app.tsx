import React, { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { ResetCss } from './components/reset-css';
import { RootCss } from './components/root-css';
import { CssList } from './components/css-list'

export const App: FunctionComponent = () => {
  useEffect(() => {
    setTimeout(() => {
      parent.postMessage({pluginMessage: {type: 'ready'}}, '*')
    }, 0)
  }, [])
  return <>
    <ResetCss />
    <RootCss />
    <CssList />
  </>
}