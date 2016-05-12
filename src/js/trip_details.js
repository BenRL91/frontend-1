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
    breakdownArr.push({passenger_price: 'all seats are booked'})
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
  }else  if(!this.allowEdit() && current_trip.seats_left === 0){
      return(
        <Link className='book-btn' to='/'>Back to Search</Link>
      )
    }else {
    return(
      <Link className='book-btn' to={`/riderbooking/${current_trip.id}`}> Book Trip <i className="fa fa-arrow-right" aria-hidden="true"></i> </Link>
    );
  }
}
showBreakdown(priceSet, index, arr){
  let { current_trip } = this.state;
  if (index === 0 || index === arr.length - 1){
    return;
  }else {
    return (
      <div className={`price-breakdown-wrapper ${this.highlight(index)}`} key={ index }>
        {index} |  {priceSet.passenger_price}
      </div>
    )
  }
}
highlight(index){
  let { current_trip, driver, riders} = this.state;
  let breakdown = this.breakdownTotalPrice(current_trip.seat_price, current_trip.seats_available, current_trip.seats_left, .2)
  let current_price = this.getCurrentPrice()
  if(index === current_price){
    return 'highlight'
  }else {
    return
  }
}
getCurrentPrice(){
  let { current_trip } = this.state;
  let breakdown = this.breakdownTotalPrice(current_trip.seat_price, current_trip.seats_available, current_trip.seats_left, .2)
  let price;
  if (current_trip.seats_available === current_trip.seats_left){
    price = 1
  }else if (current_trip.seats_available > current_trip.seats_left && current_trip.seats_left !== 0){
    price = (breakdown.length - (current_trip.seats_left + 1))
  }else if (current_trip.seats_left === 0){
    price = 0
  }
  return price;
}
renderPage(){
    let { current_trip, driver, riders} = this.state;
    let { trip_id } = this.props.params;
    let breakdown = this.breakdownTotalPrice(current_trip.seat_price, current_trip.seats_available, current_trip.seats_left, .2)
    let current_price = this.getCurrentPrice()
    console.log(current_price)
    console.log(current_trip)
    return (
      <div className="trip-details-wrapper">
        <div className="trip-details">

          <div className="book-edit">
          <div> Trip Details </div> {::this.renderEditLink()}
          </div>


        <div className="trip-details-flex">

        <div className="the-trip"><i className="fa fa-map-marker" aria-hidden="true"></i></div>

      <div>
        <div className="trip-details-departing-wrapper">
          <div className="trip-details-departing">
            <div className="separate">Departure </div>
            <div className="dest" 
                 title={current_trip.departing_city}>
                 {current_trip.departing_city}
            </div>

          </div>
            <div>{current_trip.date_leave}</div>
        </div>

        <br/>

          <div className="trip-details-destination-wrapper">
           <div className="trip-details-destination">
            <div className="separate"> Destination </div>
            <div className="dest" 
                 title={current_trip.destination}>
                 {current_trip.destination}</div>
            </div>
            
            <div>{current_trip.date_arrive}</div>
          </div>
        </div>


        </div>



           <div className="trip-details-seats-wrapper">

            <i className="fa fa-credit-card" aria-hidden="true"></i>

                <div className="trip-details-seats">

                  <div className='current-price'>
                    Currently {breakdown[current_price].passenger_price}
                  <div className="trip-price-explanation">
                  <div>
                      The price goes down as more riders join this trip.<br/>
                      The price is calculated by the distance of the trip, <br/>
                      average MPG, and daily gas prices. You won't be <br/>
                      charged until the trip has started
                      to ensure the <br/>
                      most seats are filled
                      so that everyone gets the <br/>lowest price.

                      <br/><br/>
                  </div>
                  </div>
                  </div>

                  <div>
                    # of seats booked | Price for each rider
                    <div className="try">
                    {breakdown.map(::this.showBreakdown)}
                    </div>
                 </div>

              </div>
          </div>



        <div className="trip-details-driver">
          <div className="trip-details-driver-flex">
            <i className="fa fa-suitcase" aria-hidden="true"></i>
              <div className="trip-details-para">
                Trip Description From {driver.first_name} {driver.last_name}: {current_trip.comments}
              </div>
          </div>
        </div>

      <div className='other-riders-title'>
        <div className="user-icon">
         <i className="fa fa-users" aria-hidden="true"></i>
        </div>


        <div className='other-riders-wrapper'>
            <div className="driver-content-flex">
              <img src={driver.pictures[0].image_url}/>
              <span className="trip-details-driver-name">
                <i className="fa fa-car" aria-hidden="true"></i>
                {driver.first_name} {driver.last_name}
              </span>
              <Link className="trip-details-driver-link" to={`/profile/${driver.id}`}> view drivers profile </Link>
            </div>
          {riders.map(::this.showRiders)}
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




        // <i className="fa fa-usd" aria-hidden="true"></i>
