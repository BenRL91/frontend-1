import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import cookie from 'js-cookie';

export default class TripDetails extends Component {


  constructor(...args){
  super(...args);
  this.state = {
    current_trip: null,
    current_user: null,
    driver: null,
    loading: true
    }
  }


  componentWillMount(){
  	let respA;
    let { trip_id } = this.props.params;
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null
  	ajax(`http://salty-river-31528.herokuapp.com/hosts/${trip_id}`)
		.then( resp => {
	        respA = resp;
          if (resp.hosts.seats_left === 100){
              resp.hosts.seats_left = resp.hosts.seats_available
          }
	        this.setState({current_trip: resp.hosts})
	        return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
		}).fail(e => { console.log(e)})
		.then( respB => {
			this.setState({driver: respB.user, loading: false})
			cookie.set('saved_trip', {trip_id})
		}).fail(e => { console.log( e) })

  }
renderLoading(){
  return (
    <div>Loading...</div>
    )
}
allowEdit(){
  let { current_trip } = this.state;
  let user_id = cookie.getJSON('current_user')
? cookie.getJSON('current_user').current_user.id
: null;
  let currentID = current_trip
  ? current_trip.user_id
  : null;
if (user_id == currentID){
  return true;
}else {
  return false;
  }
}
renderEditLink(){
  let { current_trip } = this.state;
  if(this.allowEdit()){
    return(
      <Link className="book-btn" to={`/edittrip/${current_trip.id}`}>
      <i className="fa fa-pencil-square-o" aria-hidden="true"></i> EDIT YOUR TRIP
      </Link>
    )
  }else {
    return(
      <Link className='book-btn' to={`/riderbooking/${current_trip.id}`}> Book Trip → </Link>
    );
  }
}
renderPage(){
    let { current_trip, driver} = this.state;
    let { trip_id } = this.props.params;
    return (
      <div className="trip-details-wrapper">
        <div className="trip-details">

        <div className="trip-details-flex">


          <div className="trip-details-departing">
            <div>
              <i className="fa fa-circle-o" aria-hidden="true"></i>
              <b>{current_trip.departing_city}</b>
            </div>
              {current_trip.date_leave}
          </div>
        <br/>
          <div className="trip-details-destination">
            <div>
              <i className="fa fa-bullseye" aria-hidden="true"></i>
              <b>{current_trip.destination}</b>
            </div>
           {current_trip.date_arrive}
         </div>


        </div>

        <div className="trip-details-seats">
          <div>{current_trip.seats_left} seats available for ${current_trip.seat_price} each
          </div>

          <div className="book-edit">
           {::this.renderEditLink()}
          </div>
        </div>


        <div className="trip-details-driver">
          <div className="trip-details-driver-flex">
            <div className="driver-content-flex">

              <img src={driver.pictures[0].image_url}/>
              <span className="trip-details-driver-name">{driver.first_name} {driver.last_name}</span>
              <Link className="trip-details-driver-link" to={`/profile/${driver.id}`}> view drivers profile </Link>
              </div>


              <div className="trip-details-para">
                Trip Description: {current_trip.comments}
               </div>


        </div>
        </div>


      </div>
     </div>
    )
  }
  render(){
    let {loading} = this.state;
    return (loading
    ? this.renderLoading()
    : this.renderPage()
    )
}
}
