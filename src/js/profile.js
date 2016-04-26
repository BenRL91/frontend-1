import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie'
export default class Profile extends Component {

  componentWillMount(){
    cookie.getJSON('current_user')
  }
  render(){
    return (
      <div className="profile-wrapper">

     	<div className="profile-header">
     		<div className="profile-picture">
     			<img src="http://www.fillmurray.com/100/100"/>
      		</div>

      		<div className="profile-user-details">

      			<div className="profile-name">
      				Jane Smith
      			</div>

      			<div className="profile-location">
      				Miami, FL
      			</div>

      			<div className="profile-status">
      				Rider
      			</div>


      		</div>
      	</div>



      	<div className="profile-trips">
      		<div className="profile-new-trips">
      			<span className="your-trips"> Your Trips </span>
      			<button className="new-trips-btn"> + MAKE A NEW TRIP </button>
      		</div>

      		<div className="profile-trips-list">
      			<span> Upcoming </span>
      			<span className="profile-cities"> ATL > LAX </span>
      			<span className="profile-dates"> 11/12/16 </span>
      			<button> expand + </button>
      		</div>

      		<div className="profile-trips-list">
      			<span> Upcoming </span>
      			<span className="profile-cities"> ATL > LAX </span>
      			<span className="profile-dates"> 11/12/16 </span>
      			<button> expand + </button>
      		</div>

      		<div className="profile-trips-list">
      			<span> Upcoming </span>
      			<span className="profile-cities"> ATL > LAX </span>
      			<span className="profile-dates"> 11/12/16 </span>
      			<button> expand + </button>
      		</div>
      	</div>


      </div>
    )
  }
}
