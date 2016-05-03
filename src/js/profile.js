import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {ajax} from 'jquery';
import cookie from 'js-cookie'

export default class Profile extends Component {
  constructor(...args){
  super(...args);
  this.state = {
    current_user_trips: [],
    current_user: null,
    loading: true
    }
  }

  componentWillMount(){
    let { user_id } = this.props.params;
         ajax(`http://salty-river-31528.herokuapp.com/profile/${user_id}`)
        .then(prof => {
          console.log('user', prof)
          this.setState({
            current_user: prof,
            current_user_trips: prof.user.host,
            loading: false
          })
        })
    }


gettrips(trip){
  return (
  <div className="profile_get_trips" key={trip.host_id}>
    <span className="profile-cities"> {trip.departing_city} to {trip.destination} </span>

      <div className="get_trips_flex">
        <span className="profile-dates"> {trip.date_leave} to {trip.date_arrive} </span>
        <Link className="profile-trip-details" to="/hostsingleview"> details + </Link>
      </div>

  </div>
)}

renderLoading(){
  return(
    <div>Loading...</div>
  )
}
renderPage(){
  let { current_user, current_user_trips } = this.state;
  return (
    <div className="profile-wrapper">

    <div className="profile-header">
      <div className="profile-picture">
        <img src={current_user.user.pictures[0].image_url}/>
        </div>

        <div className="profile-user-details">

          <div className="profile-name">
            {current_user.user.first_name} {current_user.user.last_name}
          </div>

          <div className="profile-status">
            Rider / Driver status
          </div>


        </div>
      </div>





      <div className="profile-trips">
        <div className="profile-new-trips">
          <span className="your-trips"> Trips </span>
        </div>

        <div className="profile-trips-list">

         { current_user_trips.map(::this.gettrips) }

        </div>


      </div>


    </div>
    )
  }
  render(){
    let { loading } = this.state;
    return(
      loading
      ? this.renderLoading()
      : this.renderPage()
    )
  }

}



     // shouldn't be available for outside viewer
     // <Link to="/hosttripbooking" className="new-trips-btn"> + MAKE A NEW TRIP </Link>
