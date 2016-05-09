// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './main';
import Home from './home';
import Login from './login';
import LoginRiderBooking from './login_rider_booking';
import LoginAtTripCreation from './login_at_trip_creation';
import Profile from './profile';
import EditProfile from './edit_profile';
import HostTripBooking from './host_trip_booking';
import DriverTripConfirmation from './driver_trip_confirmation';
import TripDetails from './trip_details';
import EditTrip from './edit_trip';
import Results from './results';
import RiderTripBooking from './rider_trip_booking';
import RiderTripConfirmation from './rider_trip_confirmation';
import RiderTripNoSeats from './rider_trip_no_seats';
import cookie from 'js-cookie';
import { ajaxSetup } from 'jquery';



let current_user = cookie.getJSON('current_user')
? cookie.getJSON('current_user').current_user
: null
if ( current_user ){
  ajaxSetup({
    headers: {
      'Auth-Token': current_user.auth_token
    }
  })
}

render((
  <Router history={ hashHistory }>
    <Route   path='/'                        component={ Main }>
      <IndexRoute                            component={ Home }/>
      <Route path='/profile/:user_id'        component={ Profile }/>
      <Route path='/editprofile/:user_id'    component={ EditProfile }/>
      <Route path='/hostbooking'             component={ HostTripBooking }/>
      <Route path='/details/:trip_id'        component={ TripDetails }/>
      <Route path='/edittrip/:trip_id'       component={ EditTrip }/>
      <Route path='/riderbooking/:id'        component={ RiderTripBooking }/>
      <Route path='/riderconfirmation'       component={ RiderTripConfirmation }/>
      <Route path='/ridernoseats'            component={ RiderTripNoSeats }/>
      <Route path='/results/:lat/:lng/:rad/:loc'  component={ Results }/>
      <Route path='/driverconfirmation'      component={ DriverTripConfirmation }/>
    </Route>
  </Router>
), document.querySelector('.app'));
