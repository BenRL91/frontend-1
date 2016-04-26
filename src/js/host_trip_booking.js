import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import script from './google_script';

export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      starting_point: null,
      destination: null
    }
  }
// getStartLocation(query){
//   console.log(query)
//   ajax(`https://maps.googleapis.com/maps/api/geocode/json?${token}&${query}`)
//   .then(resp => {
//     console.log(resp)
//   })
// }
// getEndLocation(query){
//   ajax(`https://maps.googleapis.com/maps/api/geocode/json?${query}${token}`)
//   .then(resp => {
//     console.log(resp)
//   })
// }
  render(){
    return (
      <div>
      <script
      src={`https://maps.googleapis.com/maps/api/js?key=${token}&callback=initMap`
      async defer/>
        <label>
          Starting:
          <input
            ref={input => this.input1 = input}
            onChange={() => this.getStartLocation(this.input1.value)}
            type='text'
            name='starting_point'
            defaultValue=''
            value={this.state.starting_point}
            placeholder='Type Start Point'/>
        </label>
        <label>
          Ending:
          <input
          ref={input => this.input2 = input}
          onChange={() => this.getEndLocation(this.input2.value)}
          type='text'
          name='starting_point'
          defaultValue=''
          value={this.state.destination}
          placeholder='Type Start Point'/>
        </label>
      </div>
    )
  }
}
