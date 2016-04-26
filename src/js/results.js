import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';




export default class Results extends Component {
  render(){
    return (
      <div className='results-wrapper'>
 			<Link to="/tripdetails">{/*mapped data of listed trips*/}</Link>
      </div>
    )
  }
}
