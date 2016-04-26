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
        {trip.departing_city}{trip.destination}
        {trip.date_leave}{trip.date_arrive}
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
