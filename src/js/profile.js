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
    profile: null,
    loading: true
    }
  }

  componentWillMount(){
    let { user_id } = this.props.params;
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
         ajax(`http://salty-river-31528.herokuapp.com/profile/${user_id}`)
        .then(profile => {
          console.log('user', profile)
          this.setState({
            current_user,
            profile: profile.user,
            current_user_trips: profile.user.host,
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
        <Link className="profile-trip-details" to={`/details/${trip.host_id}`}> details + </Link>
      </div>

  </div>
)}
allowEdit(){
  let { user_id } = this.props.params;
  let current_user = cookie.getJSON('current_user')
? cookie.getJSON('current_user').current_user
: null;
  let currentID = current_user
  ? current_user.id
  : null;
if (user_id == currentID){
  console.log('matching')
  return true;
}else {
  console.log('failing')
  return false;
}
}
renderLoading(){
  return(
    <div>Loading...</div>
  )
}
renderEditLink(){
  let { user_id } = this.props.params;
  if(this.allowEdit()){
    return(
      <Link className="edit-btn" to={`/editprofile/${user_id}`}> EDIT YOUR PROFILE </Link>
    )
  }else {
    return;
  }
}
renderPage(){
  let { profile, current_user_trips } = this.state;
  return (
    <div className="profile-wrapper">

    <div className="profile-header">
      <div className="profile-picture">
        <img src={profile.pictures[0].image_url}/>
        </div>

        <div className="profile-user-details">

          <div className="profile-name">
            {profile.first_name} {profile.last_name}
          </div>

          <div className="profile-status">
            Driver status:{profile.driver.toString()}
          </div>
          {this.renderEditLink()}
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
