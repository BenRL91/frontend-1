import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import classNames from 'classnames';
import Modal from './modal';
import Login from './login';



export default class Main extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: cookie.getJSON('current_user'),
      showLogin: false
    }
  }

  showLoginHandler(event) {
    event.preventDefault();
    this.setState({showLogin: true});
  }

  hideLoginHandler() {
    this.setState({showLogin: false});
  }

  logOut(){
    cookie.remove('current_user')
    cookie.remove('newTrip')
  }


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
          <Login/>
        </Modal>
      </div>
    )
  }
}

            // <Link className='register' to="/login">LOGIN/REGISTER</Link>
// ajax(`https://salty-river-31528.herokuapp.com/profile/${resp.hosts.user_id}`);
            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
