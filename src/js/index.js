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
import HostSingleView from './host_single_view';
import HostSignUp from './host_signup';
import DriverTripConfirmation from './driver_trip_confirmation';
import TripDetails from './trip_details';
import EditTrip from './edit_trip';
import Results from './results';
import RiderTripBooking from './rider_trip_booking';
import cookie from 'js-cookie';
import { ajaxSetup } from 'jquery';



let current_user = {};

if (cookie.getJSON('current_user').current_user !== undefined) {
  ajaxSetup({
            headers: {
              'Auth-Token': cookie.getJSON('current_user').current_user.auth_token
            }
          })
}



function checkIfDriver(state, replace){
  current_user = cookie.getJSON('current_user')
  console.log(current_user)
  if(!current_user.current_user.driver){
    replace('/hostsignup')
  }
}


function checkIfLoggedIn(state, replace){
  let user = cookie.getJSON('current_user');
  let trip_id = cookie.getJSON('saved_trip');
  if (!user) {replace('/loginriderbooking')}
}


// need to add LOGIN 1 2 3 and PROFILE/:ID and MYPROFILE////

render((
  <Router history={ hashHistory }>
    <Route path='/'                  component={ Main }>
      <IndexRoute                    component={ Home }/>
      <Route path='/login'           component={ Login }/>
      <Route path='/profile'         component={ Profile } onEnter={checkIfDriver}/>
      <Route path='/hosttripbooking' component={ HostTripBooking }/>
      <Route path='/hostsingleview'  component={ HostSingleView }/>
      <Route path='/tripdetails/:trip_id'     component={ TripDetails }/>
      <Route path='/edittrip'     component={ TripDetails }/>
      <Route path='/ridertripbooking/:id' component={ RiderTripBooking } onEnter={checkIfLoggedIn}/>
      <Route path='/results'         component={ Results }/>
      <Route path='/hostsignup'      component={ HostSignUp }/>
      <Route path='/loginriderbooking' component={ LoginRiderBooking }/>
      <Route path='loginattripcreation' component={LoginAtTripCreation}/>
      <Route path='/drivertripconfirmation' component={DriverTripConfirmation}/>

    </Route>
  </Router>
), document.querySelector('.app'));





		// Move me back when we have data
      // <Route path='/profile/:user_name'/>
