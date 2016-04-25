import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class Profile extends Component {
  render(){
    return (
      <div className="profile-wrapper">

     	<div className="profile-picture">
     	<img src="http://www.fillmurray.com/100/100"/>
      	</div>

      	<div className="profile-name">
      	First, Last
      	</div>

      	<div className="profile-trips">
      		<span> Your Trips </span>
      		<button> + MAKE A NEW TRIP </button>
      		<span> Upcoming </span>
      		<span className="profile-cities"> ATL > LAX </span>
      		<span className="profile-dates"> 11/12/16 </span>
      		<button> expand + </button>
      	</div>


      </div>
    )
  }
}
