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

      <Link className="hidden edit-btn" to={`/edittrip/${trip_id}`}> + EDIT YOUR TRIP </Link>

        <div className="trip-details">

         <div className="trip-details-flex">

           <div className="trip-details-departing">
            <b>{trip.departing_city}</b> <br/> {trip.date_leave}
           </div>

           <div className="trip-details-destination">
            <b>{trip.destination}</b> <br/> {trip.date_arrive}
           </div>

            {/*<div className="trip-details-duration">
            trip durationneed to estimate* calc by taking hour leave - hour arrive when those fields are created
            </div>*/}
         </div>


        <div className="trip-details-seats">
          <b>{trip.seats_available}</b>
          <br/>  seats available
        </div>


        <div className="trip-details-price">
          <span>${trip.seat_price}</span>
         </div>
      </div>


      <br/>
      <br/>


        <div className="trip-details-driver">
          <img src={user.picture}/>

          <span className="trip-details-driver-name">DRIVERS NAME</span>
          <span>Verified Driver</span>

          <Link className="trip-details-driver-link" to={`/profile/${trip.user_id}`}> visit drivers profile </Link>

          <div className="trip-details-para">
  				  Trip Description: {trip.comments}
     		  </div>

     	 	</div>

     	 	<br/><br/>

     	 	<Link className='book-btn' to={`/ridertripbooking/${trip.id}`}> + Book Trip</Link>


     </div>
    )
  }
}



// <Link to="/profile"> go to driver profile </Link>
// NEED TO SPECIFY THAT YOURE GOING TO THAT SPECIFIC DRIVERS PROFILE//
