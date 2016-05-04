import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';
import { ajax } from 'jquery';
import GeoSuggest from 'react-geosuggest';

export default class Home extends Component {


  onSuggestSelect(suggest) {
  console.log(suggest);
}
  render(){
    return (
     <div className='home-main-wrapper'>

      <div className='home-wrapper'>
        <div className='search-wrapper'>
          <div className='geo-wrapper'>
            <label>
            Departure:
            <GeoSuggest
              placeholder="Start typing!"
              onSuggestSelect={this.onSuggestSelect}
              />
            </label>
          </div>
          <div className='geo-wrapper'>
            <label>
            Destination:
            <GeoSuggest/>
            </label>
          </div>
          <button onClick={() => { hashHistory.push('/results')}}>Search</button>
        </div>
      </div>
     </div>
    )
  }
}
