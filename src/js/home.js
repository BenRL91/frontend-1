import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';
import { ajax } from 'jquery';
import GeoSuggest from 'react-geosuggest';
import SSF from 'react-simple-serial-form';

let latA;
let lngA;
let latB;
let lngB;

export default class Home extends Component {


onSuggestSelectDepart(suggest) {
console.log(suggest);
latA = suggest.location.lat;
lngA = suggest.location.lng;
}
onSuggestSelectDest(suggest) {
console.log(suggest);
latB = suggest.location.lat;
lngB = suggest.location.lng;
}
dataHandler(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)

  hashHistory.push('/results')
}
  render(){
    return (
     <div className='home-main-wrapper'>

      <div className='home-wrapper'>

        <SSF onData={::this.dataHandler} className='search-wrapper'>

           <div className='geo-wrapper'>

            <label>
            Departure:
            <GeoSuggest
              placeholder="Start typing!"
              onSuggestSelect={this.onSuggestSelectDepart}
              name='departure'
              />
            </label>
          </div>
          <div className='geo-wrapper'>
            <label>
            Destination:
            <GeoSuggest
              placeholder="Start typing!"
              onSuggestSelect={this.onSuggestSelectDest}
              name='destination'
            />
            </label>
          </div>
            <button> Search Trips </button>
        </SSF>

      </div>
     </div>
    )
  }
}
