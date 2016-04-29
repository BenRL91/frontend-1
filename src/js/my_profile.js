import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {ajax} from 'jquery';
import cookie from 'js-cookie'



//////MY PROFILE HAS EDITING CAPABILITIES ONLY AVAILABLE FOR CREATOR OF PROFILE////


export default class Profile extends Component {
  constructor(...args){
  super(...args);
  this.state = {
    current_user_trips: []
    }
  }

  componentWillMount(){
    let user = cookie.getJSON('current_user').current_user

        ajax({
        url: 'http://salty-river-31528.herokuapp.com/hosts',
        headers: {
          'Auth-Token': user.auth_token
        }
        }).then( resp => {
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
