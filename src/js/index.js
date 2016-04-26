// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './main';
import Home from './home';
import Login from './login';
import Profile from './profile';
import HostTripBooking from './host_trip_booking';
import HostSingleView from './host_single_view';
import TripDetails from './trip_details';

render((
  <Router history={ hashHistory }>
    <Route path='/'          component={ Main }>
      <IndexRoute            component={ Home }/>
      <Route path='/login'   component={ Login }/>
      <Route path='/profile' component={ Profile }/>
      <Route path='/hosttripbooking' component={ HostTripBooking }/>
      <Route path='/hostsingleview' component={ HostSingleView }/>
      <Route path='/tripdetails' component={ TripDetails }/>
    </Route>
  </Router>
), document.querySelector('.app'));





		// Move me back when we have data
      // <Route path='/profile/:user_name'/>
