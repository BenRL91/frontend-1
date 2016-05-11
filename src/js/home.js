import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';
import { ajax } from 'jquery';
import GeoSuggest from 'react-geosuggest';
import SSF from 'react-simple-serial-form';
import Select from 'react-select';

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
dataHandler(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)

  hashHistory.push(`/results/${query.latA}/${query.lngA}/${query.rad}/${query.travel}`)
}
  render(){
    return (
     <div className='home-main-wrapper'>

      <div className='home-wrapper'>

        <SSF onData={::this.dataHandler} className='search-wrapper'>
            Search all trips leaving from a specific location:
            <br/>


<div className='geo-wrapper'>
             <select name='travel'>
               <option value='depart'>Departing from</option>
               <option value='dest'>Traveling to</option>
             </select> 
           

           
            
            <label>
            <GeoSuggest
              placeholder="Choose a Location"
              onSuggestSelect={this.onSuggestSelectDepart}
              name='departure'
              />
            </label>
          </div>

          <label className="radio">
             Search Radius by Mile
            <input type='radio' defaultChecked={false} name='rad' value='1'/>1
            <input type='radio' defaultChecked={false} name='rad' value='5'/>5
            <input type='radio' defaultChecked={true} name='rad' value='10'/>10
            <input type='radio' defaultChecked={false} name='rad' value='20'/>20
            <input type='radio' defaultChecked={false} name='rad' value='50'/>50
          </label>
          <label>
          </label>

            <button> Search Trips </button>

            <br/>
            <br/>

        </SSF>
      </div>
     </div>
    )
  }
}



// react select fix
//  <Select
//      name="travel"
//      options={[
//      {value: 'depart', label: 'Departing from'} , 
//      {value: 'dest', label: 'Traveling to'}
//               ]}
//             />
