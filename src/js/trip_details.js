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
	        this.setState({current_trip: resp.hosts})
	        return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
		}).fail(e => { console.log(e)})
		.then( respB => {
      console.log(respB)
			this.setState({driver: respB.user, loading: false})
			cookie.set('saved_trip', {trip_id})
		}).fail(e => { console.log( e) })

  }
renderLoading(){
  return (
    <div>Loading...</div>
    )
}
renderPage(){
    let { current_trip, driver} = this.state;
    let { trip_id } = this.props.params;
    return (
      <div className="trip-details-wrapper">

      <Link className="hidden edit-btn" to={`/edittrip/${trip_id}`}> + EDIT YOUR TRIP </Link>



        <div className="trip-details">

         <div className="trip-details-flex">
           <div className="trip-details-departing">
            <b>{current_trip.departing_city}</b> <br/> {current_trip.date_leave}
           </div>

            <div className="direction-line">  </div> <div className="direction-arrow"> ► </div>

            <div className="trip-details-destination">
            <b>{current_trip.destination}</b> <br/> {current_trip.date_arrive}
            </div>
            </div>

          <div className="trip-details-seats">
          <b>{current_trip.seats_available}</b>
          <br/>  seats available
          </div>

          <div className="trip-details-price">
          <span>${current_trip.seat_price}</span>
          </div>



        <div className="trip-details-driver">
          <div className="trip-details-driver-flex">

            <img src={driver.pictures[0].image_url}/>

            <div className="driver-content-flex">
              <div>
                <span className="trip-details-driver-name">{driver.first_name}</span>
                  <br/>
                <Link className="trip-details-driver-link" to={`/profile/${driver.id}`}> view drivers profile </Link>
              </div>

              <div className="trip-details-para">
                Trip Description: {current_trip.comments}
               </div>
            </div>

        </div>
        </div>


      </div>




           <Link className='book-btn' to={`/riderbooking/${current_trip.id}`}> Book Trip → </Link>
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
