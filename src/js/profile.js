import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {ajax} from 'jquery';
import cookie from 'js-cookie'



////NEED TO ADD USER ID///////
////MAKE RIDER/DRIVER DYNAMIC, IF ELSE, TRUE FALSE?/////
////ADD TRIP ID SO ONCLICK OF EXPAND TAKES U TO THE RIGHT TRIP TO EDIT//////


export default class Profile extends Component {
  constructor(...args){
  super(...args);
  this.state = {
    current_user_trips: []
    }
  }

  componentWillMount(){
        ajax('http://salty-river-31528.herokuapp.com/hosts').then( resp => {
            this.setState({current_user_trips: resp.host})
            }
        )
    }


          gettrips(trip){
            return (
            <div className="profile_get_trips" key={trip.id}>
              <span className="profile-cities"> {trip.departing_city} to {trip.destination} </span>

                <div className="get_trips_flex">
                  <span className="profile-dates"> {trip.date_leave} to {trip.date_arrive} </span>
                  <Link className="profile-trip-details" to="/hostsingleview"> details + </Link>
                </div>

            </div>
          )}



  render(){
      let trips = this.state.current_user_trips;
      let current_user = cookie.getJSON('current_user')
    return (
      <div className="profile-wrapper">

      <div className="profile-header">
        <div className="profile-picture">
          <img src="http://www.fillmurray.com/100/100"/>
          </div>

          <div className="profile-user-details">

            <div className="profile-name">
              {current_user.current_user.first_name} {current_user.current_user.last_name}
            </div>

            <div className="profile-status">
              Rider / Driver status
            </div>


          </div>
        </div>





        <div className="profile-trips">
          <div className="profile-new-trips">
            <span className="your-trips"> Your Trips </span>
            <Link to="/hosttripbooking" className="new-trips-btn"> + MAKE A NEW TRIP </Link>
          </div>

          <div className="profile-trips-list">

           { trips.map(::this.gettrips) }

      		</div>


      	</div>


      </div>
    )
  }
}
