import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';

export default class DriverTripConfirmation extends Component {

render(){
	let current_user = cookie.getJSON('current_user')
	? cookie.getJSON('current_user').current_user
	: null
	if (current_user){
		return(


			<div className="driver-trip-confirmation-wrapper">

			<span>Thanks for booking your trip with Lifteri!</span>
			<Link className='driverlink' to={`/profile/${current_user.id}`}>View Your Profile</Link>
			</div>


		)
	}else {
		return (
			<div>You must be logged in to view this page.</div>
		)
	}

	}
}
