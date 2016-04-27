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
import HostSignUp from './host_signup';
import TripDetails from './trip_details';
import Results from './results';
import cookie from 'js-cookie';

let current_user = null;

function checkIfDriver(state, replace){
  current_user = cookie.getJSON('current_user').current_user
  console.log(current_user)
  if(current_user.driver){
    replace('/hostsignup')
  }
}
render((
  <Router history={ hashHistory }>
    <Route path='/'                  component={ Main }>
      <IndexRoute                    component={ Home }/>
      <Route path='/login'           component={ Login }/>
      <Route path='/profile'         component={ Profile } onEnter={checkIfDriver}/>
      <Route path='/hosttripbooking' component={ HostTripBooking }/>
      <Route path='/hostsingleview'  component={ HostSingleView }/>
      <Route path='/tripdetails/:trip_id'     component={ TripDetails }/>
      <Route path='/results'         component={ Results }/>
      <Route path='/hostsignup'      component={ HostSignUp }/>
    </Route>
  </Router>
), document.querySelector('.app'));





		// Move me back when we have data
      // <Route path='/profile/:user_name'/>
