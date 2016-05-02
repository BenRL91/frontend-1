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
import MyProfile from './my_profile';
import EditProfile from './edit_profile';
import HostTripBooking from './host_trip_booking';
import HostSingleView from './host_single_view';
import HostSignUp from './host_signup';
import DriverTripConfirmation from './driver_trip_confirmation';
import TripDetails from './trip_details';
import EditTrip from './edit_trip';
import Results from './results';
import RiderTripBooking from './rider_trip_booking';
import RiderTripConfirmation from './rider_trip_confirmation';
import RiderTripNoSeats from './rider_trip_no_seats';
import cookie from 'js-cookie';
import $, { ajaxSetup } from 'jquery';



let current_user;
if (cookie.getJSON('current_user')) {
  current_user = cookie.getJSON('current_user').current_user
  console.log(cookie.getJSON('current_user'))
  ajaxSetup({
            headers: {
              'Auth-Token': current_user.auth_token
            }
          })
          console.log('hey')
  $('.logout').removeClass('hidden');
}else {
  current_user = null;
  $('.logout').addClass('hidden');
}
function checkIfLoggedIn(state, replace){
  if (cookie.getJSON('current_user')) {
    current_user = cookie.getJSON('current_user').current_user
    ajaxSetup({
              headers: {
                'Auth-Token': current_user.auth_token
              }
            })
  }else {
    current_user = null;
  }  let trip_id = cookie.getJSON('saved_trip');
  if (!current_user) {replace('/loginriderbooking')}
}

function checkIfLoggedInProfile(state, replace){
  if (cookie.getJSON('current_user')) {
    current_user = cookie.getJSON('current_user').current_user
    ajaxSetup({
              headers: {
                'Auth-Token': current_user.auth_token
              }
            })
  }else {
    current_user = null;
  }
      if (!current_user) {replace('/login')}
}

render((
  <Router history={ hashHistory }>
    <Route path='/'                          component={ Main }>
      <IndexRoute                            component={ Home }/>
      <Route path='/login'                   component={ Login }/>
      <Route path='/profile/:user_id'        component={ Profile }/>
      <Route path='/myprofile'               component={ MyProfile }        onEnter={checkIfLoggedInProfile}/>
      <Route path='/editprofile/:user_id'    component={ EditProfile }/>
      <Route path='/hosttripbooking'         component={ HostTripBooking }/>
      <Route path='/hostsingleview'          component={ HostSingleView }/>
      <Route path='/tripdetails/:trip_id'    component={ TripDetails }/>
      <Route path='/edittrip/:trip_id'       component={ EditTrip }/>
      <Route path='/ridertripbooking/:id'    component={ RiderTripBooking } onEnter={checkIfLoggedIn}/>
      <Route path='/ridertripconfirmation'   component={ RiderTripConfirmation }/>
      <Route path='/ridertripnoseats'        component={ RiderTripNoSeats }/>
      <Route path='/results'                 component={ Results }/>
      <Route path='/hostsignup'              component={ HostSignUp }/>
      <Route path='/loginriderbooking'       component={ LoginRiderBooking }/>
      <Route path='loginattripcreation'      component={ LoginAtTripCreation }/>
      <Route path='/drivertripconfirmation'  component={ DriverTripConfirmation }/>
    </Route>
  </Router>
), document.querySelector('.app'));
