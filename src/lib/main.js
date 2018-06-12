import React from 'react';
import { render } from 'react-dom';
import './../common/polyfill';
import {polyfill} from 'es6-promise';
import Root from './pages/routes';
// import './../scss/main.scss';
import './../scss/pages/_sample.scss';

//components
window.globals.version = 'version';
console.info(window.globals.version);

polyfill();

document.addEventListener("DOMContentLoaded", ()=>{
  globals.domLoad = true;
});


//its supposed to be <Root /> not <Delivery />
render(
  <Root />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/routes', () => {
    const Root = require('./pages/routes').default;
    render(
      <Root />,
      document.getElementById('root')
    );
  });
}


