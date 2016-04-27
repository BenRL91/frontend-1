import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';


export default class TripDetails extends Component {

  constructor(...args){
  super(...args);
  this.state = {
    current_trip: {}
    }
  }



			//example of returning multiple promises

 //  tmp() {

 //  	let respA;

	// ajax(`http://salty-river-31528.herokuapp.com/hosts/${this.props.params.trip_id}`)
	// 	.then( resp => {
	//         respA = resp;
	//         return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.user_id}`);
	// 	})
	// 	.then( respB => {
	// 		console.log('a', respA);
	// 		console.log('b', respB);
	// 	})

 //  }


  componentWillMount(){
	let trip_id = this.props.params.trip_id

        ajax(`http://salty-river-31528.herokuapp.com/hosts/${trip_id}`).then( resp => {
            this.setState({current_trip: resp.user})
            console.log(resp)

            }
        )
    }


			// request to get info on the driver 
			
  // checkProf(){
  //   let user_id = cookie.getJSON('current_user').current_user.id
  //   ajax(`https://salty-river-31528.herokuapp.com/profile/${user_id}`).then( resp => {
  //     console.log(resp)
  //   })
  // }


  render(){
  	let trip = this.state.current_trip; 
  	console.log(trip)
    return (
      <div className="trip-details-wrapper">


      	<div className="trip-details">
  				

  			 <div className="trip-details-cities">
  				departure: {trip.departing_city} destination: {trip.destination} 
     		 </div>

     		 <div className="trip-details-dates">
  				{trip.date_leave} to {trip.date_arrive}
     		 </div>

     		 <div className="trip-details-duration">
  				trip duration{/*need to estimate*/}
     	 	</div>

     	 	<div className="trip-details-price">
  				$ {trip.seat_price}
     		 </div>

     		 <div className="trip-details-seats">
  				seats available: {trip.seats_available}
     	 	</div>

     	 	<div className="trip-details-expand">
  				<button> expand details </button>
     		</div>

     	</div>

     	<br/>
     	<br/>


     	 	<div className="trip-details-driver">
     	 		<span>John</span>
     	 		<span>Verified Driver</span> 
     	 		<button> expand details </button>			
     	 	</div>


     </div>
    )
  }
}
