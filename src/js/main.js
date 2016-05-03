import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import classNames from 'classnames';

export default class Main extends Component {
<<<<<<< HEAD
  constructor(...args){
    super(...args);
    this.state = {
      current_user: cookie.getJSON('current_user')
    }
  }
=======

>>>>>>> 575f2e558d36f279af6e3effc6d09597462af378
  logOut(){
    cookie.remove('current_user')
    cookie.remove('newTrip')
  }
  render(){
<<<<<<< HEAD
    // let regClass = classNames('register', {hidden: this.state.current_user });
    // let logoutClass = classNames('logout', {hidden: !this.state.current_user });
=======
     // let user = cookie.getJSON('current_user').current_user;
>>>>>>> 575f2e558d36f279af6e3effc6d09597462af378
    return (
      <div className="main-wrapper">
        <div className='top-main-wrapper'>
          <div className="main-logo">
            <Link to="/">L I F T E R I</Link>
          </div>

          <div className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/myprofile"> Profile </Link>
            <Link to="/hosttripbooking">Host A Trip</Link>
<<<<<<< HEAD
            <Link className='register' to="/login">LOGIN/REGISTER</Link>
            <Link className='logout' to="/">
                    <button
                      className='logout'
                      onClick={::this.logOut}>Log Out
                    </button>
           </Link>
=======
            <Link to="/login">LOGIN/REGISTER</Link>
            <Link to="/"><button className='logout' onClick={::this.logOut}>Log Out</button></Link>
            <Link to='/myprofile'> Hello, user.first_name </Link>
>>>>>>> 575f2e558d36f279af6e3effc6d09597462af378
          </div>
        </div>
        {this.props.children}

      </div>
    )
  }
}

// ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
