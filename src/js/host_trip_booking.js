import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';

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
      }
    }
  }
componentWillMount(){
  let storedTrip = cookie.getJSON('newTrip')
  console.log('trip', storedTrip)
  if (storedTrip) {
    this.setState({
      trip: storedTrip.newTrip
    })
  }
}
  book(trip_details){
    let user = cookie.getJSON('current_user')
    cookie.set('newTrip', { newTrip: trip_details })
    if (!user.current_user){
      hashHistory.push('/loginattripcreation')
    }else if(user.current_user && !user.current_user.driver){
      hashHistory.push('/hostsignup')
    }else {
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/hosts',
        type: 'POST',
        data: trip_details
      }).then( resp => {
        console.log(resp)
      hashHistory.push('/drivertripconfirmation')
    })
  }
}




  render(){
    let { trip } = this.state;
    console.log(cookie.getJSON('current_user'))
    return (

      <div className="host-booking-wrapper">

     	 <SSF className='host-trip-form' onData={::this.book}>
     	 HOST TRIP BOOKING PAGE <br/><br/>

            <label>
              Departure City:
              <input
                type='text'
                name='departing_city'
                defaultValue={trip.departing_city}
                placeholder='Where are you leaving from?'/>
            </label>

            <label>
              Date:
              <input
                type='date'
                name='date_leave'
                defaultValue={trip.date_leave}
                placeholder='When are you leaving?'/>
            </label>

            <label>
              Destination:
              <input
                type='text'
                name='destination'
                defaultValue={trip.destination}
                placeholder='Where are you driving to?'/>
            </label>


            <label>
              Date:
              <input
                type='date'
                name='date_arrive'
                defaultValue={trip.date_arrive}
                placeholder='Whats your ETA?'/>
            </label>

            <label>
              Seats Available:
              <input
                type='text'
                name='seats_available'
                defaultValue={trip.seats_available}
                placeholder='Number of seats you want to make available'/>
            </label>

            <label>
              Total Price:
              <input
                type='text'
                name='seat_price'
                defaultValue={trip.seat_price}
                placeholder='List the price for all seats'/>
            </label>


            <span className="host-span"> Tip: It looks like the estimate PPS (Price Per Seat) for your trip is $25,
            	you've listed 3 seats available. A suggested total is $75.
            	Riders will reserve seats ahead of time, and the price will go down for them
            	based on how many seats are filled.  But no worries, you will always get the total amount. </span>


             <label className="trip-description">
              Trip Description:
              <input
                type='text'
                name='comments'
                defaultValue={trip.comments}
                placeholder='tell us about your trip'/>
            </label>



            <button>HOST</button>

     	 </SSF>
      </div>
    )
  }
}





// NEED TO INTERPERLATE ESTIMATE PRICES IN TIP PARAGRAPH/////





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
