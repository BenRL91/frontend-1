import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripCreation from './login_at_trip_creation';
import HostSignUp from './host_signup';
import requireLogin from './login_require';
import GeoSuggest from 'react-geosuggest';
​
​
@requireLogin
export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      trip: {
        comments: "",
        date_arrive: "",
        date_leave: "",
        departing_city: "",
        destination: "",
        seat_price: "",
        seats_available : ""
      },
      showLogin: false,
      showLoginDriver: false,
      showSignup: false
    }
  }
componentWillMount(){
  let { showSignup } = this.state;
  if (!cookie.getJSON('current_user').driver){
    this.setState({
      showSignup: true
    })
  }
  let storedTrip;
  if (cookie.getJSON('newTrip')) {
    storedTrip = cookie.getJSON('newTrip');
    this.setState({
      trip: storedTrip.newTrip
    })
  }else storedTrip = null;
}
​
  showLoginHandler(event) {
    event.preventDefault();
    this.setState({showLogin: true});
  }
​
  hideLoginHandler() {
    console.log('closing', !this.state.requireLogin, cookie.getJSON('current_user'))
    if (!this.state.requireLogin || cookie.getJSON('current_user')) {
      this.setState({showLogin: false});
    }
  }
  showSignuphHandler(){
    if (!cookie.getJSON('current_user').driver){
      this.setState({showSignup: true})
    }else{this.setState({showSignup: false})}
  }
isDriver(user){
  if (user.current_user.driver){
    return true;
  }else {
    return false;
  }
}
  book(trip_details){
    let user = cookie.getJSON('current_user')
    cookie.set('newTrip', { newTrip: trip_details })
    if (!user){
      // hashHistory.push('/loginattripcreation')
      this.setState({showLogin: true})
    }else if(!this.isDriver(user)){
      // hashHistory.push('/hostsignup')
      this.setState({showLoginDriver: true})
    }else {
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/hosts',
        type: 'POST',
        data: trip_details,
        headers: {
          'Auth-Token': user.current_user.auth_token
        }
      }).then( resp => {
        console.log(resp)
      cookie.remove('newTrip')
      hashHistory.push('/drivertripconfirmation')
    })
  }
}
​
​
​
onSuggestSelectDepart(suggest) {
console.log(suggest);
latA = suggest.location.lat;
lngA = suggest.location.lng;
}
onSuggestSelectDest(suggest) {
console.log(suggest);
latB = suggest.location.lat;
lngB = suggest.location.lng;
}
dataHandler(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)
​
  hashHistory.push('/results')
}
​
​
​
​
  render(){
    let { trip, showSignup } = this.state;
    let user_id = cookie.getJSON('current_user').id;
    console.log(user_id)
    return (
​
      <div className="host-booking-wrapper">
       <Modal show={showSignup} onCloseRequest={ x => x}>
          <div cassName='signup-banner'>You must become a driver in order to book a trip, please visit <Link to={`/editprofile/${user_id}`}>Profile Edit</Link> to sign up!</div>
       </Modal>
       <SSF className='host-trip-form' onData={::this.book}>
       HOST TRIP BOOKING PAGE <br/><br/>
​
            <label>
              Departure City:
              <GeoSuggest
                type='text'
                name='departing_city'
                onSuggestSelect={this.onSuggestSelectDepart}
                placeholder='Where are you leaving from?'/>
            </label>
​
              <input
                type='hidden'
                name='depart_latitude'/>
​
              <input
                type='hidden'
                name='depart_longitude'/>
​
            <label>
              Date:
              <input
                type='date'
                name='date_leave'
                placeholder='When are you leaving?'/>
            </label>
​
            <label>
              Destination:
              <GeoSuggest
                type='text'
                name='destination'
                onSuggestSelect={this.onSuggestSelectDest}
                placeholder='Where are you driving to?'/>
            </label>
​
              <input
                type='hidden'
                name='destination_longitude'/>
​
              <input
                type='hidden'
                name='destination_longitude'/>
​
​
​
            <label>
              Date:
              <input
                type='date'
                name='date_arrive'
                placeholder='Whats your ETA?'/>
            </label>
​
            <label>
              Seats Available:
              <input
                type='text'
                name='seats_available'
                placeholder='Number of seats you want to make available'/>
            </label>
​
            <label>
              Total Price:
              <input
                type='text'
                name='seat_price'
                placeholder='List the price for all seats'/>
            </label>
​
​
            <span className="host-span"> Tip: It looks like the estimate PPS (Price Per Seat) for your trip is $25,
              you've listed 3 seats available. A suggested total is $75.
              Riders will reserve seats ahead of time, and the price will go down for them
              based on how many seats are filled.  But no worries, you will always get the total amount. </span>
​
​
             <label className="trip-description">
              Trip Description:
              <textarea
                type='text'
                name='comments'
                placeholder='tell us about your trip'>
            </textarea>
            </label>
            <button>HOST</button>
       </SSF>
      </div>
    )
  }
}
​
​
​
​
​
// NEED TO INTERPERLATE ESTIMATE PRICES IN TIP PARAGRAPH/////
​
​
​
​
​
      ////*<script
      // <div>
      // src={`https://maps.googleapis.com/maps/api/js?key=${token}&callback=initMap`
      // async defer/>
        // <label>
          // Starting:
          // <input
            // ref={input => this.input1 = input}
            // onChange={() => this.getStartLocation(this.input1.value)}
            // type='text'
            // name='starting_point'
            // defaultValue=''
            // value={this.state.starting_point}
            // placeholder='Type Start Point'/>
        // </label>
        // <label>
          // Ending:
          // <input
          // ref={input => this.input2 = input}
          // onChange={() => this.getEndLocation(this.input2.value)}
          // type='text'
          // name='starting_point'
          // defaultValue=''
          // value={this.state.destination}
          // placeholder='Type Start Point'/>
         // </label>
// */////