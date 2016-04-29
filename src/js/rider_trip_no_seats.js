import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class RiderTripNoSeats extends Component {
render(){
	return(


		<div className="rider-trip-confirmation-wrapper">

		<span>Sorry there are no seats left on this trip</span>
		<Link to="/">Try another search</Link>
		</div>


		)
	}
}
