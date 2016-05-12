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
    loading: true,
    riders: null,
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
	        this.setState({current_trip: resp.hosts, riders: resp.riders})
	        return ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
		}).fail(e => { console.log(e)})
		.then( respB => {
			this.setState({driver: respB.user, loading: false})
			cookie.set('saved_trip', {trip_id})
		}).fail(e => { console.log( e) })
  }
  breakdownTotalPrice(total, seats_available, seats_left, discount){
    let breakdownArr = [];
    if (seats_left === 100){
      seats_left = seats_available
    }
    for( seats_left = 0; seats_left < seats_available + 1; seats_left++){
      let breakdown = {}
      let even_split = total / ((seats_available + 1) - (seats_left - 1))
      let residual = even_split * discount
      let driver_price;
      driver_price = seats_available === seats_left
      ? even_split
      : even_split - (even_split * discount)
      let passenger_price = seats_available - seats_left >= 0
      ? even_split + (residual / (seats_left - (seats_left - 1)))
      : even_split
      breakdown.driver_price = `$${driver_price.toFixed(2)}`
      breakdown.passenger_price = `$${passenger_price.toFixed(2)}`
      breakdown.average = (even_split.toFixed(2))
      if (breakdown.passenger_price === 'Infinity'){
        breakdown.passenger_price = driver_price
      }
      breakdownArr.push(breakdown)
    }
    breakdownArr.push({passenger_price: 'This trip is completely booked!'})
    return (
      breakdownArr.reverse()
    )
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
showRiders(rider){
  let url = `https://salty-river-31528.herokuapp.com/profile/${rider.id}`
  return (
    <div className='other-riders' key={rider.id}>
      <Link to={url}><img src={rider.pictures[0]}/></Link>
      <span><b>{rider.first_name}, {rider.last_name}</b></span>
    </div>
  )
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
      <Link className='book-btn' to={`/riderbooking/${current_trip.id}`}> Book Trip <i className="fa fa-arrow-right" aria-hidden="true"></i> </Link>
    );
  }
}
showBreakdown(priceSet, index, arr){
  let { current_trip } = this.state;
  if (index === 0){
    return;
  }else {
    return (
      <div className={`price-breakdown-wrapper ${this.highlight(index)}`} key={ index }>
        Price with {index} Passengers: {priceSet.passenger_price}
      </div>
    )
  }
}
highlight(index){
  let { current_trip, driver, riders} = this.state;
  let breakdown = this.breakdownTotalPrice(current_trip.seat_price, current_trip.seats_available, current_trip.seats_left, .2)
  let current_price = current_trip.seats_available - (current_trip.seats_left + 1) <= 0
  ? current_trip.seats_available - current_trip.seats_left + 1
  : 0
  if(index === current_price){
    return 'highlight'
  }else {
    return
  }
}
renderPage(){
    let { current_trip, driver, riders} = this.state;
    let { trip_id } = this.props.params;
    let breakdown = this.breakdownTotalPrice(current_trip.seat_price, current_trip.seats_available, current_trip.seats_left, .2)
    let current_price = current_trip.seats_available - (current_trip.seats_left + 1) <= 0
    ? current_trip.seats_available - current_trip.seats_left + 1
    : 0
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
        <div>

        <div className='current-price'>Currently {breakdown[current_price].passenger_price}</div>
          {breakdown.map(::this.showBreakdown)}
        </div>

          <div className="book-edit">
           {::this.renderEditLink()}
          </div>
        </div>

        <div className="trip-price-explanation">
          <div>
            <i className="fa fa-info-circle" aria-hidden="true"></i>
              <b>The price goes down as more riders join this trip.</b>
              The prices are calculated from the trips distance, average MPG, and daily gas prices.
              You won't be charged until the trip has started to ensure as many
              seats are filled as possible.
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

        <div className='other-riders-title'>
         <b>other riders on this trip</b>
        </div>

        <div className='other-riders-wrapper'>
          {riders.map(::this.showRiders)}
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
