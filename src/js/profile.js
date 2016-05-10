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
    <div className="profile-cities"> 

      <i className="fa fa-circle-o" aria-hidden="true"></i>
      {trip.departing_city} 
      <br/>

      <i className="fa fa-bullseye" aria-hidden="true"></i>
      {trip.destination} 

    </div>
    <Link className="profile-trip-details" to={`/details/${trip.host_id}`}> details + </Link>
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

          <div className="profile-name">
            {profile.first_name} {profile.last_name}
          </div>

            <br/>

          <div className="profile-status">
            Driver status:{profile.driver.toString()}
          </div>

           <br/>

          <div className="profile-email">
            <i className="fa fa-envelope-o" aria-hidden="true"></i> {profile.email}
          </div>

            <br/>

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
          <div className="booked-trips"><b>Booked Trips</b></div>
            { profile.trips_ridden.map(::this.gettrips)}
            <br/>
            <br/>
         
          <div className="hosted-trips"><b>Hosted Trips</b></div>
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
