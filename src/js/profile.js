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
          this.setState({
            current_user,
            profile: profile.user,
            current_user_trips: profile.user.trips_hosted,
            loading: false
        })
      })
    }
gettrips(trip){
  return (
  <div className="profile_get_trips" key={trip.host_id}>

    <div className="marker-flex">
    <i className="fa fa-map-marker" aria-hidden="true"></i>
    <div className="profile-cities">
      <div className="flex">
      <div className="depart-flex">
        Departing </div>
        {trip.departing_city}
      </div>
     
        <br/>

      <div className="flex">
      <div className="dest-flex">
        Destination  </div>
        {trip.destination}
      </div>


    </div>
    </div>

    <div className="profile-arrow">
      <Link className="profile-trip-details" to={`/details/${trip.host_id}`}> details <i className="fa fa-arrow-right" aria-hidden="true"></i> </Link>
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
  return true;
}else {
  console.log('failing')
  return false;
  }
}
renderLoading(){
  return(

    <i className="fa fa-spinner" aria-hidden="true"></i>

  )
}
renderEditLink(){
  let { user_id } = this.props.params;
  if(this.allowEdit()){
    return(
      <Link className="edit-btn" to={`/editprofile/${user_id}`}>
      <i className="fa fa-pencil-square-o" aria-hidden="true"></i> EDIT YOUR PROFILE
      </Link>
    )
  }else {
    return;
  }
}
renderPage(){
  let { profile, current_user_trips } = this.state;
  console.log('profile', profile)
  return (
    <div className="profile-wrapper">
    <div className="profile-wrapper-inside">


    <div className="profile-header">
      <div className="profile-picture">
        <img src={profile.pictures[0].image_url}/>
        </div>

        <div className="profile-user-details">

          <div className="profile-name"> {profile.first_name} {profile.last_name}
          </div>

           <br/>

           <div className="profile-car">
             <i className="fa fa-car" aria-hidden="true"></i> {profile.car_info}
           </div>

      

           <div className="profile-home">
             <i className="fa fa-map-marker" aria-hidden="true"></i> {profile.home_city}
           </div>

           <div className="profile-email">
            <i className="fa fa-envelope-o" aria-hidden="true"></i> {profile.email}
           </div>


          <div className="profile-status">
            <i className="fa fa-user" aria-hidden="true"></i> {profile.user_name}
          </div>
             <br/>

          <div className="profile-edit">
          {this.renderEditLink()}
          </div>

        </div>
      </div>





      <div className="profile-trips">


      <div className="profile-trips-list">
        <div className="lines">
          <div className="booked-trips"><b>Rider Trips</b></div>
            { profile.trips_ridden.map(::this.gettrips)}
        </div>
            <br/>
            <br/>

          <div className="hosted-trips"><b>Driver Trips</b></div>
            { current_user_trips.map(::this.gettrips) }
        </div>


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
