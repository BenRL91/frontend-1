import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class Main extends Component {
  render(){
    return (
      <div className="main-wrapper">
        <div className='top-main-wrapper'>
          <div className="main-logo">
            <img src="http://www.fillmurray.com/30/30" alt="logo-holder"/>
          </div>

          <div className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
            <Link to="/profile">Host A Trip</Link>
            <Link to="/">Sign Up</Link>
            <Link to="/login">LOGIN</Link>
          </div>
        </div>
        {this.props.children}

      </div>
    )
  }
}


            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
