// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './main.js';

render((
  <Router history={ hashHistory }>
    <Route path='/' component={ Main }/>
  </Router>
), document.querySelector('.app'));
