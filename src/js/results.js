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
         <img src={trip.user.picture} alt="temp"/>
         <div className="results-cities"> <b>{trip.departing_city}</b> to <b>{trip.destination}</b> </div>
        </div>

        <div className="results-dates-price-flex">
          <div className="results-dates"> <b>{trip.date_leave}</b></div>

          <div className="results-dates-arrow-flex">
            <div className="results-price"> $ {trip.seat_price} </div>

        <Link className="results-arrow" to={`/details/${trip.id}`}> <b> → </b></Link>
        </div>
        </div>
      </div>
    )
  }
  // ?destination_latitude=${lat}&destination_longitude=${lng}&radius=${rad}
  componentWillMount(){
    let { lat, lng, rad, loc } = this.props.params;
    if (loc === 'depart'){
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/depart_search',
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
      <div className='results-wrapper'>
        {trips.map(::this.makeTripListing)}
      </div>
    )
  }
}
