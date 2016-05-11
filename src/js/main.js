import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import classNames from 'classnames';
import Modal from './modal';
import Login from './login';
import RiderTripBooking from './rider_trip_booking';




export default class Main extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: null,
      user_is_driver: false,
      showLogin: false
    }
  }
  componentWillMount(){
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({ current_user });
    let user_is_driver = current_user ? current_user.driver : false;
      this.setState({ user_is_driver });
  }
  checkLogin(loggedIn){
    let { current_user } = this.state;
    if(loggedIn){
      this.setState({current_user})
    }
  }
  getLink(){
    let { current_user } = this.state;
    let shownLink = current_user
    ?  <div className="main-link">
          <Link className='logout' to="/">
            <button
              className='logout'
              onClick={::this.logOut}>Log Out
            </button>
          </Link>
          <Link to={`/profile/${current_user.id}`}> Hello, {current_user.first_name}! </Link>
       </div>
    :  <a href="#" onClick={::this.showLoginHandler}>Login</a>
    return shownLink;
    this.setState({ current_user })
  }
  logOut(){
  cookie.remove('current_user');
  cookie.remove('newTrip');
  this.setState({ current_user: null})
  }
  loginHandler(){
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
    console.log('current user', current_user)
      this.setState({ current_user });
    let user_is_driver = current_user ? current_user.driver : false;
      this.setState({ user_is_driver });
    if (current_user){
      this.hideLoginHandler()
    }
  }
  showLoginHandler(event) {
    event.preventDefault();
    this.setState({showLogin: true});
  }

  hideLoginHandler() {
    this.setState({showLogin: false});
  }
  render(){
    let { current_user, showLogin } = this.state;
    return (
      <div className="main-wrapper">
        <div className='top-main-wrapper'>
          <div className="main-logo">
            <Link to="/"><img src="../images/lifteripainted.png"/></Link>
          </div>
          <div className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/hostbooking">Host A Trip</Link>
           {this.getLink()}
          </div>
        </div>
        {this.props.children}
        <Modal show={showLogin} onCloseRequest={::this.hideLoginHandler}>
          <Login onLogin={::this.loginHandler}/>
        </Modal>
      </div>
  )}
}
