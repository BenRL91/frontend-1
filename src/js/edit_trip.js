import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';


export default class EditTrip extends Component {


	edit(trip_details){
    ajax({
      url: `https://salty-river-31528.herokuapp.com/hosts/${hosts.id}`,
      type: 'PUT',
      data: trip_details
    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push('/tripdetails')
    })
  }



  render(){

  	let trip = this.state.current_trip;
  	let user = this.state.current_user;

    return (
      <div className="trip-details-wrapper">


      <div className="trip-details">

      	<SSF className='edit-trip-form' onData={::this.edit}>

  			<label>
  			 departure:
  				<input
  			 		type='text'
  			 		name='departing_city'
  			 		defaultValue={trip.departing_city}/>
     		</label>

     		<label>
     		 date leaving:
     			<input
  			 		type='date'
  			 		name='date_leave'
  			 		defaultValue={trip.date_leave}/>
     		</label>

     		<label>
     		 destination:
     		   	<input
  			 		type='text'
  			 		name='destination'
  			 		defaultValue={trip.destination}/>
     		</label>

     		<label>
     		 date arriving:
     		 	<input
  			 		type='date'
  			 		name='date_arrive'
  			 		defaultValue={trip.date_arrive}/>
     		</label>

     		<label>
  				trip duration{/*need to estimate*/}
     	 	</label>

     	 	<label>
     	 	 price:
     		 	<input
  			 		type='text'
  			 		name='seat_price'
  			 		defaultValue= {trip.seat_price}/>		
     		</label>

     		<label>
     		 seats available:
     		 	<input
  			 		type='text'
  			 		name='seats_available'
  			 		defaultValue= {trip.seats_available}/>
     	 	</label>

     	 	<label>
     		 description of trip:
     		 	<input
  			 		type='text'
  			 		name='comments'
  			 		defaultValue= {trip.comments}/>
     	 	</label>

     
  				<button> submit changes </button>

  				(and return to trip details)

  				<button>DELETE this trip</button>

  		 </SSF>
     	

     	</div>



     </div>







  	)
  }
}
