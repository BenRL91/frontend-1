import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import classNames from 'classnames';

export default class Main extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: cookie.getJSON('current_user')
    }
  }
  logOut(){
    cookie.remove('current_user')
    cookie.remove('newTrip')
  }
  render(){
    // let regClass = classNames('register', {hidden: this.state.current_user });
    // let logoutClass = classNames('logout', {hidden: !this.state.current_user });
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
            <Link className='register' to="/login">LOGIN/REGISTER</Link>
            <Link className='logout' to="/">
                    <button
                      className='logout'
                      onClick={::this.logOut}>Log Out
                    </button>
           </Link>
          </div>
        </div>
        {this.props.children}

      </div>
    )
  }
}


            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
