import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import cookie from 'js-cookie';
import requireLogin from './login_require';

       //// add me to route to RIDER TRIP BOOKED AFTER COOKIE.SET // hashHistory.push('/tripdetails');


// PUT REQUEST/////
///need to make this so that were just sending backend the user ID because the CC info is dummy data//////

@requireLogin
export default class RiderTripBooking extends Component {
	constructor(...args){
		super(...args);
		console.log('my class', args)
	}
	  book(rider_trip_booking) {

		// 	let tripData
		// 	let {id} = this.props.params;
		// 	ajax(`https://salty-river-31528.herokuapp.com/riders/${id}`).then(
		// 		resp => {
		// 			tripData = resp.hosts
		// 			if (tripData.seats_available > 0){
		// 				tripData.seats_available -= 1
		// 				console.log(tripData.seats_available)
		// 				ajax({
		// 		      url: `https://salty-river-31528.herokuapp.com/hosts/${id}`,
		// 		      type: 'PUT',
		// 		      data: {seats_available: tripData.seats_available},
    //           headers: {
    //             'Auth-Token': cookie.getJSON('current_user').current_user.auth_token
    //           }
		// 		    }).then(resp => {
		// 		        cookie.set('current_trip', {current_trip: resp.trip})
    //             hashHistory.push('/ridertripconfirmation')
		// 		      }).fail(e => console.log(e))
		// 			}else {
		// 				ajax({
		// 					url: `https://salty-river-31528.herokuapp.com/hosts/${id}`,
		// 					type: 'PUT',
		// 					data: {seats_available: tripData.seats_available},
    //           headers: {
    //             'Auth-Token': cookie.getJSON('current_user').current_user.auth_token
    //           }
		// 				}).then(resp => {
		// 						cookie.set('current_trip', {current_trip: resp.trip})
    //             hashHistory.push('/ridertripnoseats')
		// 					}).fail(e => console.log(e))					}
		// 		}
		// 	)
    // }
			let {id} = this.props.params;

		ajax({
			url: `https://salty-river-31528.herokuapp.com/riders/${id}`,
			type: 'PUT',
			headers: {
				'Auth-Token': cookie.getJSON('current_user').current_user.auth_token
			}
		})
	}



  render(){
    return (
      <div className="rider-trip-booking-wrapper">


      <SSF className='rider-trip-booking' onData={(x) => x}>

      		<span> seats left on this trip ..interpolate.. </span>


            <span> Your price ..interpolate.. $80 </span><br/>
            <span> You won't be charge for this trip until the day of departure,<br/>
            this will leave time for other riders to book a seat, and lower the price for you (& them). </span>

            <label>
              Name as it appears on card:
              <input
                type='text'
                name='name_on_card'
                placeholder='first last'/>
            </label>

            <label>
              Card Number:
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




        </SSF>
				<SSF onData={::this.book}>
					Add me to the trip!
					<input
						type='hidden'
						name='user_id'/>
					<button>Book This Trip</button>
				</SSF>



      </div>
    )
  }
}
