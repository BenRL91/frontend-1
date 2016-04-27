import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import cookie from 'js-cookie';


export default class TripDetails extends Component {

  constructor(...args){
  super(...args);
  this.state = {
    current_trip: {},
    current_user: {}
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

  	let respA;

	ajax(`http://salty-river-31528.herokuapp.com/hosts/${this.props.params.trip_id}`)
		.then( resp => {
	        respA = resp;
	        console.log('check here', resp)
	        this.setState({current_trip: resp.hosts})
	        return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
		})
		.then( respB => {
			console.log('a', respA);
			console.log('b', respB);
			this.setState({current_user: respB.user})
			cookie.set('saved_trip', {trip_id: this.props.params.trip_id})
      console.log('checking cookie', cookie.getJSON('saved_trip'))
		})

  }


// original ajax call - single/////

 //  componentWillMount(){
	// let trip_id = this.props.params.trip_id

 //        ajax(`http://salty-river-31528.herokuapp.com/hosts/${trip_id}`).then( resp => {
 //          console.log(resp)
 //            this.setState({current_trip: resp.hosts})

 //            }
 //        )
 //    }


			// request to get info on the driver

  // checkProf(){
  //   let user_id = cookie.getJSON('current_user').current_user.id
  //   ajax(`https://salty-river-31528.herokuapp.com/profile/${user_id}`).then( resp => {
  //     console.log(resp)
  //   })
  // }


  render(){
  	let trip = this.state.current_trip;
  	let user = this.state.current_user;
  	console.log(trip)

    return (
      <div className="trip-details-wrapper">


      	<div className="trip-details">


  			 <div className="trip-details-cities">
  				departure: {trip.departing_city} <br/> destination: {trip.destination}
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
     	 		<span>{user.first_name} {user.last_name}</span>
     	 		<span>Verified Driver</span>
     	 		<button> expand details </button>
     	 	</div>

     	 	<br/><br/>

     	 	<Link to="/ridertripbooking">BOOK THIS TRIP!</Link>


     </div>
    )
  }
}
