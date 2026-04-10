import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

import { NotasDeCredito } from './lib/notas-de-credito';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NotasDeCredito,
  renderType: 'createRoot',
  domElementGetter() {
    let element = document.getElementById('single-spa-slot');

    if (!element) {
      element = document.createElement('div');
      element.id = 'single-spa-slot';
      document.body.appendChild(element);
    }

    return element;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
