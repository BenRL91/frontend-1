import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripCreation from './login_at_trip_creation';
import GeoSuggest from 'react-geosuggest';

let latA, lngA, latB, lngB;

export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: null,
      user_is_driver: false,
      showLogin: false,
    }
  }
    componentWillMount(){
      let current_user = cookie.getJSON('current_user')
      ? cookie.getJSON('current_user').current_user
      : null;
      let user_is_driver = current_user
      ? current_user.driver
      : false;
        this.setState({
          current_user,
          user_is_driver
        });
    }

  loginHandler(){
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({ current_user });
    if (current_user){
      this.hideLoginHandler()
    }
  }
  showLoginHandler() {
    let { current_user } = this.state;
    console.log('current_user', current_user)
    if(!current_user){
      this.setState({showLogin: true})
    }
  }
  hideLoginHandler() {
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({showLogin: false, current_user  });
  }

  book(trip_details){
    let { current_user, showLogin } = this.state;
    console.log('current_user', current_user)
    if(!current_user){
      this.setState({showLogin: true})
    }else {
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/hosts',
        type: 'POST',
        data: trip_details
      }).then( resp => {
        console.log(resp)
      hashHistory.push('/driverconfirmation')
    })
  }
}
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

  hashHistory.push('/results')
}

  render(){
    let { showLogin, driver_info } = this.state;
    return (
      <div className="host-booking-wrapper">
     	 <SSF className='host-trip-form' onData={::this.book}>
     	 SIGN UP TO HOST YOUR OWN TRIP <br/><br/>​
           <label>
             Phone:
             <input
               type='tel'
               name='phone'
               placeholder='Phone Number'
               defaultValue={driver_info}/>
           </label>
           <br/>
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
              Price Per A Seat:
              <input
                type='text'
                name='seat_price'
                placeholder='Suggestion Price Interpolated Here'/>
            </label>
​
​
            <span className="host-span"> 
            Tip: The price listed above is a suggested price calculated by 
            the actual miles you're traveling and the daily gas prices.  
            This tool is made available as a guideline, but you may charge 
            what you want. 
            </span>
​
             <label className="trip-description">
              Trip Description:
              <textarea
                type='text'
                name='comments'
                placeholder='tell potential riders about your trip'>
            </textarea>
            </label>
            <button>HOST</button>
     	 </SSF>
       <Modal show={showLogin} onCloseRequest={::this.hideLoginHandler}>
         <LoginAtTripCreation onLogin={::this.loginHandler}/>
       </Modal>
      </div>
    )
  }
}
