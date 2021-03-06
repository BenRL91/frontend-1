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

			<div className="driver-trip-confirmation-wrapper-top">
				<div className="driver-trip-confirmation-wrapper">
					<span>Thanks for booking your trip with Lifteri!</span>
					<span>Make sure to check your E-mail for the details of your trip!</span>
					<Link className='driverlink' to={`/profile/${current_user.id}`}>
						View Trips in Your Profile
					</Link>
					<br/>
					<i className="fa fa-car" aria-hidden="true"></i>
				</div>
			</div>


		)
	}else {
		return (
			<div>You must be logged in to view this page.</div>
		)
	}

	}
}
