// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './main';
import Home from './home';
import Login from './login';
import Profile from './profile';
import HostTripBooking from './host_trip_booking';

render((
  <Router history={ hashHistory }>
    <Route path='/'          component={ Main }>
      <IndexRoute            component={ Home }/>
      <Route path='/login'   component={ Login }/>
      <Route path='/profile' component={ Profile }/>
      <Route path='/host_booking' component={ HostTripBooking }/>
    </Route>
  </Router>
), document.querySelector('.app'));





		// Move me back when we have data
      // <Route path='/profile/:user_name'/>
