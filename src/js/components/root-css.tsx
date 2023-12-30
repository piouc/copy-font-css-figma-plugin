import React from 'react';
import { FunctionComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

const Css = createGlobalStyle`
  a {
    color: inherit;
    text-decoration: inherit;
  }
`

export const RootCss: FunctionComponent = () => {
  return <Css />
}