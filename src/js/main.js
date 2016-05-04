import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import classNames from 'classnames';
import Modal from './modal';
import Login from './login';

import RiderTripBooking from './rider_trip_booking';

// const LOGIN_REQUIRED = [
//   /\/ridertripbooking\/\d+/
// ]


export default class Main extends Component {
  // static contextTypes = {
  //   router: PropTypes.object.isRequired
  // }

  static childContextTypes = {
    requireLogin: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      requireLogin: () => {
        this.setState({showLogin: true});
      }
    };
  }


  constructor(...args){
    super(...args);
    this.state = {
      current_user: cookie.getJSON('current_user'),
      showLogin: false
    }
  }

  componentWillMount() {
    hashHistory.listen(() => {
      this.setState({showLogin: false});
    })
  }

  // isLoginRequired() {
  //   if (cookie.getJSON('current_user')) {
  //     return false;
  //   }
  //   let { pathname } = this.props.location;
  //   // debugger;
  //   return LOGIN_REQUIRED.find(regx => regx.exec(pathname));
  // }

  showLoginHandler(event) {
    event.preventDefault();
    this.setState({showLogin: true});
  }

  hideLoginHandler() {
    // if (!this.isLoginRequired()) {
      this.setState({showLogin: false});
    // }
  }

  logOut(){
    cookie.remove('current_user')
    cookie.remove('newTrip')
  }

  // componentWillMount() {
  //   // console.log('route ==>', this.context.router.getCurrentPathname())
  //   // window.RR = this.context.router;
  //   console.log('what the fuck?', this.isLoginRequired())
  //   if (this.isLoginRequired()) {
  //     this.setState({showLogin: true});
  //   }
  // }

  // componentWillReceiveProps(props, context) {
  //   // console.log('route ==>', context.router.getCurrentPathname())
  //   // if (this.isLoginRequired()) {
  //     this.setState({showLogin: true});
  //   // }
  // }


  render(){

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
            <a href="#" onClick={::this.showLoginHandler}>Login</a>
            <Link className='logout' to="/">
                    <button
                      className='logout'
                      onClick={::this.logOut}>Log Out
                    </button>
           </Link>

            <Link to='/myprofile'> Hello, user.first_name </Link>
          </div>
        </div>

        {this.props.children}


        <Modal show={this.state.showLogin} onCloseRequest={::this.hideLoginHandler}>
          <Login onLogin={::this.hideLoginHandler}/>
        </Modal>
      </div>
    )
  }
}

            // <Link className='register' to="/login">LOGIN/REGISTER</Link>
// ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
