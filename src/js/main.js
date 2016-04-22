import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class Main extends Component {
  render(){
    return (
      <div className="main-wrapper">
      	<div className="main-logo">
      		<img src="http://www.fillmurray.com/30/30" alt="logo-holder"/>
      	</div>

      	<div className="main-nav">
      		<Link  to="/">Home</Link>
      		<Link  to="/">About</Link>
      		<Link  to="/">Profile</Link>
      	</div>

      	<div className="main-sign-up-in">
      		<Link  to="/">Sign Up</Link>
      		<Link  to="/">Sign In</Link>
      	</div>

      </div>
    )
  }
}
