import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import cookie from 'js-cookie';
import $ from 'jquery';


export default class TripDetails extends Component {

  constructor(...args){
  super(...args);
  this.state = {
    current_trip: {},
    current_user: {}
    }
  }


  componentWillMount(){
  	let respA;
    let user_id;
    let user = cookie.getJSON('current_user')
    if (user){
      user_id = user.current_user.id;
    }else {
      user_id = null;
    }
    ajax(`http://salty-river-31528.herokuapp.com/hosts/${this.props.params.trip_id}`)
    .then( resp => {
      console.log(resp)
      if (user_id === resp.hosts.user_id ){
        $('.edit-btn').removeClass('hidden');
        $('.book-btn').addClass('hidden');
      }

    })

	ajax(`http://salty-river-31528.herokuapp.com/hosts/${this.props.params.trip_id}`)
		.then( resp => {
	        respA = resp;
	        this.setState({current_trip: resp.hosts})
	        return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
		})
		.then( respB => {
      console.log(respB)
			this.setState({current_user: respB.user})
			cookie.set('saved_trip', {trip_id: this.props.params.trip_id})
		}).fail(e => { console.log( e) })

  }


  // check auth
  // IF logged in SHOW EDIT BUTTON
  // ELSE dont show edit button
  //***** CHECK HERE IF USER CREATED THE TRIP THEYRE VIEWING,
  // IF SO MAKE AN EDIT BUTTON AVAILABLE**** 1st FRIDAY****



			// request to get info on the driver

  // checkProf(){
  //   let user_id = cookie.getJSON('current_user').current_user.id
  //   ajax(`https://salty-river-31528.herokuapp.com/profile/${user_id}`).then( resp => {
  //     console.log(resp)
  //   })
  // }


  render(){
  	let trip    = this.state.current_trip;
  	let user    = this.state.current_user;
    let trip_id = this.props.params.trip_id;

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

     	 	<div className="trip-details-para">
  				{trip.comments}
     		</div>

     	</div>

      <Link className="hidden edit-btn" to={`/edittrip/${trip_id}`}> EDIT THIS TRIP </Link>

     	<br/>
     	<br/>


     	 	<div className="trip-details-driver">
          <img src={user.picture}/>
     	 		<span>{user.first_name} {user.last_name}</span>
     	 		<span>Verified Driver</span>
     	 		<Link to={`/profile/${trip.id}`}> go to driver profile </Link>
     	 	</div>

     	 	<br/><br/>

     	 	<Link className='book-btn' to={`/ridertripbooking/${trip.id}`}>BOOK THIS TRIP!</Link>


     </div>
    )
  }
}



// <Link to="/profile"> go to driver profile </Link>
// NEED TO SPECIFY THAT YOURE GOING TO THAT SPECIFIC DRIVERS PROFILE//
