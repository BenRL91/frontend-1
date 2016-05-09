import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';
import { ajax } from 'jquery';
import GeoSuggest from 'react-geosuggest';
import SSF from 'react-simple-serial-form';

let latA, lngA, latB, lngB;

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
dataHandlerDepart(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)

  hashHistory.push(`/results/${query.latA}/${query.lngA}/${query.rad}`)
}
dataHandlerDest(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)

  hashHistory.push(`/results/${query.latB}/${query.lngB}/${query.rad}`)
}
  render(){
    return (
     <div className='home-main-wrapper'>

      <div className='home-wrapper'>

        <SSF onData={::this.dataHandlerDepart} className='search-wrapper'>

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
          <label>
            Within
            <input type='radio' selected={false} name='rad' value='1'/>
            <input type='radio' selected={false} name='rad' value='5'/>
            <input type='radio' selected={false} name='rad' value='10'/>
            <input type='radio' selected={false} name='rad' value='20'/>
            <input type='radio' selected={false} name='rad' value='50'/>
          </label>
            <button> Search Trips </button>
        </SSF>
        <SSF onData={::this.dataHandlerDest} className='search-wrapper'>

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
        <label>
          Within
          <input type='radio' selected={false} name='rad' value='1'/>
          <input type='radio' selected={false} name='rad' value='5'/>
          <input type='radio' selected={false} name='rad' value='10'/>
          <input type='radio' selected={false} name='rad' value='20'/>
          <input type='radio' selected={false} name='rad' value='50'/>
        </label>
            <button> Search Trips </button>
        </SSF>

      </div>
     </div>
    )
  }
}
