import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';


export default class Results extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      trips: []
    }
  }
  makeTripListing(trip){
    return(
      <div key={trip.id} className='trip-listing-wrapper'>


        <div className="results-img-cities-flex">
         <img src="http://www.fillmurray.com/50/50" alt="temp"/>
         <div className="results-cities"> <b>{trip.departing_city}</b> to <b>{trip.destination}</b> </div>
        </div>

        <div className="results-dates-price-flex">
          <div className="results-dates"> Leaving <b>{trip.date_leave}</b> Returning <b>{trip.date_arrive}</b></div>
          <div className="results-price"> $ {trip.seat_price} </div>

        <Link to={`/tripdetails/${trip.id}`}> <b>TRIP DETAILS</b></Link>
        </div>

      </div>
    )
  }
  componentWillMount(){
    ajax('https://salty-river-31528.herokuapp.com/hosts')
    .then(trips => {
      this.setState({trips: trips.host})
    })
  }
  render(){
    let { trips } = this.state;
    return (
      <div className='results-wrapper'>
        {trips.map(::this.makeTripListing)}
      </div>
    )
  }
}
