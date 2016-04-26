import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';


export default class Home extends Component {

  render(){
    return (
      <div className='home-wrapper'>
        <div className='search-wrapper'>
          <label>
            Departure:
            <input
              type='text'
              name='departure'
              placeholder='Choose a starting point'/>
          </label>
          <label>
            Destination:
            <input
              type='select'
              name='destination'
              placeholder='Choose an end point'/>
          </label>
          <button>Search</button>
        </div>
      </div>
    )
  }
}
