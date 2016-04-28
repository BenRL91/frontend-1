import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';


       //// add me to route to RIDER TRIP BOOKED AFTER COOKIE.SET // hashHistory.push('/tripdetails');



// PUT REQUEST/////
///need to make this so that were just sending backend the user ID because the CC info is dummy data//////

export default class RiderTripBooking extends Component {

	  book(rider_trip_booking) {
    ajax({
      url: `https://salty-river-31528.herokuapp.com/hosts/${id}`,
      type: 'PUT',
      data: rider_trip_booking
    }).then(resp => {
        console.log(resp)
        cookie.set('current_trip', {current_trip: resp.trip})
      })
    }



  render(){
    return (
      <div className="rider-trip-booking-wrapper">


      <SSF className='rider-trip-booking' onData={::this.book}>

      		<span> seats left on this trip ..interpolate.. </span>


            <span> Your price ..interpolate.. $80 </span>
            <span> You won't be charge for this trip until the day of departure, 
            this will leave time for other riders to book a seat, and lower the price for you (& them). </span>

            <label>
              Name as it appears on card:
              <input
                type='text'
                name='name_on_card'
                placeholder='first last'/>
            </label>

            <label>
              Credit Card Number:
              <input
                type='text'
                name='credit_card_number'
                placeholder='CC number here'/>
            </label>

            <label>
              Expiration Date:
              <input
                type='date'
                name='expiration_date'
                placeholder='MM/YY format'/>
            </label>
            <label>
              3 digit security code:
              <input
                type='text'
                name='security_code'
                placeholder='###'/>
            </label>

            <button>Book This Trip</button>

          

        </SSF>


      


      </div>
    )
  }
}



  // DO WE NEED THIS?///////

            // <label>
            //   How many seats do you need:
              // <input
            //     type='text'
            //     name='seats_available'
            //     placeholder='number of seats'/>
            // </label>






