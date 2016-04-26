import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';

export default class HostTripBooking extends Component {
 

  book(host_credentials){
    ajax({
      url: 'https://salty-river-31528.herokuapp.com/',
      type: 'POST',
      data: user_credentials
    }).then( resp => {
      console.log(resp)
    		}
    	)
    }




  render(){

    return (
      <div className="host-booking-wrapper">
     	 HOST TRIP BOOKING PAGE

     	 <SSF className='host-trip-form' onData={::this.book}>

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
                type='text'
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
                type='text'
                name='date_arrive'
                placeholder='Whats your ETA?'/>
            </label>

            <label>
              Seats Available:
              <input
                type='password'
                name='seats_available'
                placeholder='Number of seats you want to make available'/>
            </label>

            <label>
              Total Price:
              <input
                type='password'
                name='seat_price'
                placeholder='List the price for all seats'/>
            </label>

            <span className="host-span"> Tip: It looks like the estimate PPS (Price Per Seat) for your trip is $25,
            	you've listed 3 seats available. A suggested total is $75. 
            Riders will reserve seats ahead of time, and the price will go down for them
            	based on how many seats are filled.  But no worries, you will always get the total amount. </span>


            <button>HOST</button>

     	 </SSF> 
      </div>
    )
  }
}
