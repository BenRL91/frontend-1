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
  breakdownTotalPrice(total, seats_available, seats_left, discount){
    if (seats_left === 100){
      seats_left = seats_available
    }
    let breakdown = {};
    let even_split = total / ((seats_available + 1) - (seats_left - 1))
    let residual = even_split * discount
    let max_residual = (total / seats_available + 1) * .2
    let driver_price;
    driver_price = seats_available === seats_left
       ? even_split
       : even_split - (even_split * discount)
    let passenger_price = seats_available - seats_left >= 0
       ? even_split + (residual / (seats_left - (seats_left - 1)))
       : even_split
    breakdown.driver_price = driver_price.toFixed(2)
    breakdown.passenger_price = passenger_price.toFixed(2)
    breakdown.lowest = (total / ((seats_available + 1))+ (max_residual / seats_available)).toFixed(2)
    if (breakdown.passenger_price === 'Infinity'){
      breakdown.passenger_price = driver_price
    }
    console.log('even_split', even_split.toFixed(2))
    return (
      breakdown
    )
  }
  makeTripListing(trip){
    let breakdown = this.breakdownTotalPrice(trip.seat_price, trip.seats_available, trip.seats_left, .2)
    return(
      <div key={trip.id} className='trip-listing-wrapper'>


        <div className="results-img-cities-flex">

         <img src={trip.user.picture} alt="temp"/>

         <div className="results-cities">
            <div className='depart'>
          <i className="fa fa-circle-o" aria-hidden="true"></i>
              {trip.departing_city} 
            </div>
          <br/>
            <div className='destination'>
          <i className="fa fa-bullseye" aria-hidden="true"></i>
              {trip.destination} 
            </div>
          </div>
        </div>


        <div className="results-dates-price-flex">

            <div className="results-date">  <b>{trip.date_leave}</b></div>

             <div>
                <div className="results-price"> Currently <b>${breakdown.passenger_price}</b></div>
                <div className="results-price"> As low as <b>${breakdown.lowest}</b> </div>
              </div>



            <Link className="results-arrow" to={`/details/${trip.id}`}> <b> <i className="fa fa-arrow-right" aria-hidden="true"></i></b></Link>

        </div>
      </div>
    )
  }
  componentWillMount(){
    let { lat, lng, rad, loc } = this.props.params;
    if (loc === 'depart'){
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/depart_search',
        type: 'GET',
        data: {
          depart_latitude: lat,
          depart_longitude: lng,
          radius: rad
        }
      })

      .then(results => {
        this.setState({trips: results.search})
        console.log(results)
      })

    }else if( loc === 'dest'){
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/dest_search',
        type: 'GET',
        data: {
          destination_latitude: lat,
          destination_longitude: lng,
          radius: rad
        }
      })

      .then(results => {
        this.setState({trips: results.search})
        console.log(results)
      })
    }
  }
  render(){
    let { trips } = this.state;
    return (
      <div className='results-wrapper-top'>

      <div className='results-wrapper'>
        {trips.map(::this.makeTripListing)}
      </div>
      </div>
    )
  }
}
