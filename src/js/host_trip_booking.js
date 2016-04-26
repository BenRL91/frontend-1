import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import script from './google_script';

export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      starting_point: null,
      destination: null
    }
  }
// getStartLocation(query){
//   console.log(query)
//   ajax(`https://maps.googleapis.com/maps/api/geocode/json?${token}&${query}`)
//   .then(resp => {
//     console.log(resp)
//   })
// }
// getEndLocation(query){
//   ajax(`https://maps.googleapis.com/maps/api/geocode/json?${query}${token}`)
//   .then(resp => {
//     console.log(resp)
//   })
// } 

  book(trip_details){
    ajax({
      url: 'https://salty-river-31528.herokuapp.com/hosts',
      type: 'POST',
      data: trip_details
    }).then( resp => {
      console.log(resp)
    		}
    	)
    	hashHistory.push('/profile');
    }




  render(){

    return (

      <div className="host-booking-wrapper">

     	 <SSF className='host-trip-form' onData={::this.book}>
     	 HOST TRIP BOOKING PAGE <br/><br/>

            <label>
              Departure City:
              <input
                type='text'
                name='departure_city'
                placeholder='Where are you leaving from?'/>
            </label>

            <label>
              Date:
              <input
                type='date'
                name='date_leave'
                placeholder='When are you leaving?'/>
            </label>

            <label>
              Destination:
              <input
                type='text'
                name='destination'
                placeholder='Where are you driving to?'/>
            </label>


            <label>
              Date:
              <input
                type='date'
                name='date_arrive'
                placeholder='Whats your ETA?'/>
            </label>

            <label>
              Seats Available:
              <input
                type='text'
                name='seats_available'
                placeholder='Number of seats you want to make available'/>
            </label>

            <label>
              Total Price:
              <input
                type='text'
                name='seat_price'
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
