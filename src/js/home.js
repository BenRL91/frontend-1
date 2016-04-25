import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class Home extends Component {

  render(){
    return (
      <div className='home-wrapper'>
        <div className='search-wrapper'>
          <label>
            Departure:
            <input type='text' placeholder='Choose a starting point'/>
          </label>
          <label>
            Destination:
            <input type='select' placeholder='Choose an end point'/>
          </label>
          <button>Search</button>
        </div>
      </div>
    )
  }
}
