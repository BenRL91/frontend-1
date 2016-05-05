import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import token from './token';
import { ajax } from 'jquery';
import GeoSuggest from 'react-geosuggest';
import SSF from 'react-simple-serial-form';

export default class Home extends Component {


  onSuggestSelect(suggest) {
  console.log(suggest);
}
dataHandler(query){
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
                placeholder="where your trip starts"
                onSuggestSelect={this.onSuggestSelect}
                name='departure'
              />
             </label>
            </div>

            <div className='geo-wrapper'>
              <label>
               Destination:
               <GeoSuggest
                placeholder="enter your destination"
                onSuggestSelect={this.onSuggestSelect}
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
